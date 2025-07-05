import { useEffect } from "react";
import type { ReactElement } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, HelpCircle, Users, RefreshCw } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const {
    jobs,
    questions,
    students,
    fetchDashboardData,
    loading,
    refreshing,
    error,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const isInitialLoading = loading;

  const renderCard = (
    title: string,
    count: number,
    icon: ReactElement,
    subtitle: string
  ) => (
    <Card
      className={cn(
        "transition-opacity duration-300",
        refreshing && !isInitialLoading && "opacity-50"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => fetchDashboardData(true)}
          disabled={refreshing}
        >
          <RefreshCw
            className={cn(
              "mr-2 h-4 w-4",
              refreshing ? "animate-spin" : "hidden"
            )}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isInitialLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-[120px] w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-300 dark:border-gray-700 shadow-sm"
            />
          ))
        ) : (
          <>
            {renderCard(
              "Total Jobs",
              jobs,
              <Briefcase className="w-5 h-5 text-muted-foreground" />,
              "Jobs listed"
            )}
            {renderCard(
              "Total Questions",
              questions,
              <HelpCircle className="w-5 h-5 text-muted-foreground" />,
              "MCQs created"
            )}
            {renderCard(
              "Total Students",
              students,
              <Users className="w-5 h-5 text-muted-foreground" />,
              "Registered students"
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

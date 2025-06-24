import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hiringData } from "./data/hiringData";

const Hiring = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-4">
        🚀 Open Hiring Positions
      </h1>
      <p className="text-center text-gray-600 text-lg mb-10">
        Explore exciting career opportunities and join amazing teams!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hiringData.map((job) => (
          <Card
            key={job.id}
            className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {job.jobTitle}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {job.company}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">💰</span>
                <p>
                  <span className="font-medium">Salary:</span> {job.salary}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <p>
                  <span className="font-medium">Location:</span> {job.location}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">👥</span>
                <p>
                  <span className="font-medium">Openings:</span> {job.openings}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">
                Posted by: {job.postedBy}
              </p>
            </CardContent>

            <CardFooter>
              <Link to={`/hiring/${job.id}`} className="w-full">
                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 transition">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hiring;

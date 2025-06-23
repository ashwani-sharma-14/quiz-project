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

const HiringPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        🚀 Open Hiring Positions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hiringData.map((job) => (
          <Card
            key={job.id}
            className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg transition  hover:shadow-xl duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {job.jobTitle}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p>
                💰 <span className="font-medium">Salary:</span> {job.salary}
              </p>
              <p>
                📍 <span className="font-medium">Location:</span> {job.location}
              </p>
              <p>
                👥 <span className="font-medium">Openings:</span> {job.openings}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Posted by: {job.postedBy}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={`/hiring/${job.id}`} className="w-full">
                <Button className="w-full rounded-xl text-white bg-blue-600  hover:bg-blue-800 hover:text-white ">
                  Apply Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HiringPage;

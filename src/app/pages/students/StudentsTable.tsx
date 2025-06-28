"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import CustomPagination from "@/components/shared/CustomPagination";
import api from "@/utils/api";

interface Student {
  id: string;
  name: string;
  email: string;
  branch: string;
}

const ROWS_PER_PAGE = 10;

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/users");
        setStudents(res.data.users || []);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const totalPages = Math.ceil(students.length / ROWS_PER_PAGE);
  const paginatedStudents = students.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <div className="space-y-6 p-6">
      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground text-sm">
            The total list of students
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedStudents.length > 0 ? (
              paginatedStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">
                    {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentsTable;

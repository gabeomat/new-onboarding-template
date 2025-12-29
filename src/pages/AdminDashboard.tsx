import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Mail, Download } from "lucide-react";

interface QuizSubmission {
  id: string;
  email: string;
  answers: Record<string, any>;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
      return;
    }

    if (user) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error("Unauthorized access");
        await signOut();
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      fetchSubmissions();
    } catch (error: any) {
      toast.error("Failed to verify admin status");
      console.error(error);
      navigate("/admin/login");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error: any) {
      toast.error("Failed to load submissions");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/admin/login");
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      toast.error("No submissions to export");
      return;
    }

    const allQuestions = new Set<string>();
    submissions.forEach(submission => {
      Object.keys(submission.answers).forEach(question => allQuestions.add(question));
    });

    const headers = ["Email", "Submitted At", ...Array.from(allQuestions)];

    const csvRows = [
      headers.join(","),
      ...submissions.map(submission => {
        const row = [
          `"${submission.email}"`,
          `"${new Date(submission.created_at).toLocaleString()}"`,
          ...Array.from(allQuestions).map(question => {
            const answer = submission.answers[question];
            const value = typeof answer === 'object' ? JSON.stringify(answer) : (answer || "");
            return `"${String(value).replace(/"/g, '""')}"`;
          })
        ];
        return row.join(",");
      })
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exported successfully");
  };

  if (loading || isLoading || !isAdmin) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Logged in as {user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Submissions</CardTitle>
              <CardDescription>
                Total submissions: {submissions.length}
              </CardDescription>
            </CardHeader>
          </Card>

          {submissions.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  No submissions yet
                </p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <CardTitle className="text-lg">{submission.email}</CardTitle>
                  </div>
                  <CardDescription>
                    {new Date(submission.created_at).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(submission.answers).map(([question, answer]) => (
                      <div key={question} className="border-l-2 border-primary pl-4">
                        <p className="font-medium text-sm text-muted-foreground mb-1">
                          {question}
                        </p>
                        <p className="text-base">
                          {typeof answer === 'object' ? JSON.stringify(answer) : answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>NextGen Starter</CardTitle>
          <CardDescription>
            A Next.js starter with Tailwind CSS, TypeScript, and Shadcn UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Welcome to your new project! This starter is designed to provide a
            solid foundation for building modern web applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <span className="font-heading text-6xl font-bold tracking-tight text-muted-foreground/30">404</span>
          <EmptyTitle>Page not found</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </EmptyDescription>
        </EmptyContent>
        <Button onClick={() => navigate("/")}>Go home</Button>
      </Empty>
    </div>
  )
}

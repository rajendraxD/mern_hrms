import { logoutThunk } from "../../../app/slices/userSlice";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardSkeleton } from "../../../components/loadingSkeleton";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutThunk());
  }

  if (status == "loading" || !user) return <CardSkeleton />
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={user.avatar || "https://avatar.vercel.sh/shadcn1"}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{(user.role).toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}</Badge>
          </CardAction>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>
            {user.email.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" variant="destructive" onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

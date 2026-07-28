import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { LogOut, User, Settings, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { googleLogout } from "@react-oauth/google"
import { logoutThunk } from "@/app/slices/userSlice"

export default function AppHeader() {
  const { theme, setTheme, THEMES } = useTheme()
  const { user } = useSelector((s) => s.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => {
            const idx = THEMES.indexOf(theme)
            setTheme(THEMES[(idx + 1) % THEMES.length])
          }}
          title={`Theme: ${theme}`}
        >
          {theme === "light" ? <Sun className="size-4" /> :
            theme === "dark" ? <Moon className="size-4" /> :
              <Monitor className="size-4" />}
        </Button>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8 rounded-full cursor-pointer" />}>
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => { googleLogout(); dispatch(logoutThunk()) }}>
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { login } from "@/lib/features/auth/authSlice"
import { AppDispatch, RootState } from "@/lib/store"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await dispatch(login(formData)).unwrap()
      toast.success("Giriş başarılı!")
      onClose()
      router.push("/main") 
    } catch (error: any) {
      toast.error(error.message || "Giriş sırasında bir hata oluştu")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 bg-white dark:bg-background">
        <div className="space-y-6 p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-4xl font-serif">
              welcome to <span className="text-primary">Post.</span>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="h-12 px-4 rounded-full border-black dark:border-white bg-transparent"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-12 px-4 rounded-full border-black dark:border-white bg-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full h-12 rounded-full bg-accent dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
                disabled={loading}
              >
                {loading ? "Giriş yapılıyor..." : "Sign In"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-black dark:border-white" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-background px-2 text-black dark:text-white">
                    Or
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button
                  type="button"
                  className="h-12 rounded-full border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  disabled={loading}
                >
                  <Image
                    src="/assets/icons/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
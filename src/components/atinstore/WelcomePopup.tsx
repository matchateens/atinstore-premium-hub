import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Headphones } from "lucide-react";

export const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session or ever.
    // We'll use sessionStorage so it shows once per browser session.
    // If you prefer it to never show again, use localStorage instead.
    const hasSeen = sessionStorage.getItem("hasSeenWelcomePopup");
    
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("hasSeenWelcomePopup", "true");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) handleClose();
    }}>
      <DialogContent className="sm:max-w-sm text-center p-6 gap-0">
        <DialogHeader className="flex flex-col items-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-xl font-display font-extrabold uppercase">
            Pemberitahuan
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-sm leading-relaxed pb-4">
            Selamat datang di <strong className="text-brand">Tinspedia</strong>!<br /><br />
            Mohon <strong>teliti dalam memilih varian produk</strong> sebelum checkout. Baca detail produk dengan saksama.<br /><br />
            Jika ada pertanyaan seputar produk atau status order, silakan langsung hubungi Admin kami.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-2.5 mt-2">
          <Button 
            onClick={handleClose} 
            className="w-full bg-brand text-white hover:bg-brand/90 font-semibold rounded-full h-11"
          >
            Saya Mengerti
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full font-semibold rounded-full h-11 gap-2"
          >
            <a href="https://wa.me/6282324644060" target="_blank" rel="noopener noreferrer">
              <Headphones className="w-4 h-4" /> Tanya Admin
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CandidaturaForm, candidaturaDialogClass } from "./CandidaturaForm";

export function RecruitingBanner() {
  return (
    <div className="border-b border-white/10 pb-12 mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Vuoi crescere con noi?</h2>
          <p className="text-primary-foreground/80 text-lg">Entra a far parte della famiglia Marson. Cerchiamo persone appassionate e professionali per ampliare il nostro team.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 whitespace-nowrap h-12 px-8 text-base shadow-md">
              Candidati ora
            </Button>
          </DialogTrigger>
          <DialogContent className={candidaturaDialogClass}>
            <DialogTitle className="sr-only">Candidatura</DialogTitle>
            <CandidaturaForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

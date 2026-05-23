import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Chargement des actualités...</p>
        </div>
    );
}

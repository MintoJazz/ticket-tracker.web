import { Skeleton } from "@/components/ui/skeleton";

export function AcceptInviteLoading() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full mt-2" />
            </div>
            <div className="flex justify-center mt-2">
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

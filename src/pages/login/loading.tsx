import { Skeleton } from "@/components/ui/skeleton";

export function LoginLoading() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full mt-2" />
            </div>
            <div className="flex justify-center">
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

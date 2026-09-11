import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoading() {
    return (
        <div className="flex flex-col gap-6 w-full p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <Skeleton className="h-64 w-full rounded-md" />
        </div>
    );
}

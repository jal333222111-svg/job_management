export default function AppLogo() {
    return (
        <>
            {/* Langsung tampilkan logo tanpa background */}
            <img
                src="/favicon.ico"
                alt="Logo Job Management"
                className="h-10 w-auto"
            />

            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Job Management
                </span>
            </div>
        </>
    );
}

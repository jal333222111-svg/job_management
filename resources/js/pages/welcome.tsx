import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex flex-col items-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] w-full">

                {/* Header */}
                <header className="absolute top-6 right-6 flex gap-4 text-sm lg:top-8 lg:right-8">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="rounded-md border border-[#19140035] px-5 py-2 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="rounded-md border border-transparent px-5 py-2 text-sm hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className="rounded-md border border-[#19140035] px-5 py-2 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </header>

                {/* Hero */}
                <section className="flex flex-col items-center justify-center text-center py-20 px-6 lg:py-32 lg:px-8 space-y-6 lg:space-y-8">
                    <h1 className="text-3xl font-semibold lg:text-5xl">
                        Selamat Datang di Aplikasi Manajemen Pekerjaan
                    </h1>
                    <p className="max-w-md text-sm lg:text-base text-[#555] dark:text-[#ccc]">
                        Aplikasi ini membantu tim dan perusahaan dalam mengelola tugas, proyek, dan progres pekerjaan dengan efektif.
                    </p>
                    {!auth.user && (
                        <div className="flex gap-4">
                            <Link
                                href={register()}
                                className="rounded-md bg-[#1b1b18] px-6 py-3 text-sm text-white hover:bg-[#333] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#ccc]"
                            >
                                Mulai Sekarang
                            </Link>
                            <Link
                                href={login()}
                                className="rounded-md border border-[#1b1b18] px-6 py-3 text-sm hover:bg-[#f0f0f0] dark:border-[#EDEDEC] dark:hover:bg-[#222]"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </section>

                {/* Tentang Kami */}
                <section className="w-full bg-[#f9f9f9] dark:bg-[#111] py-20 px-6 lg:px-32 text-center">
                    <h2 className="text-2xl font-semibold mb-4 lg:text-4xl">Tentang Kami</h2>
                    <p className="max-w-2xl mx-auto text-[#555] dark:text-[#ccc]">
                        Aplikasi web ini dirancang untuk memudahkan manajemen pekerjaan dan proyek. 
                        Dengan fitur dashboard, penugasan, dan notifikasi, tim dapat bekerja lebih efisien, memantau progres pekerjaan, 
                        serta memastikan semua tugas selesai tepat waktu.
                    </p>
                </section>

                {/* Fitur */}
                <section className="w-full py-20 px-6 lg:px-32 text-center">
                    <h2 className="text-2xl font-semibold mb-10 lg:text-4xl">Fitur Unggulan</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A]">
                            <h3 className="font-semibold mb-2">Dashboard Admin/Manager</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Menampilkan ringkasan proyek, pekerjaan aktif, dan progres tim secara realtime.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A]">
                            <h3 className="font-semibold mb-2">Manajemen Pekerjaan</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Input, update, dan pantau semua pekerjaan serta tugas tim dengan mudah.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A]">
                            <h3 className="font-semibold mb-2">Penugasan & Notifikasi</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Menetapkan pekerjaan ke karyawan dan menerima notifikasi saat ada update atau deadline mendekat.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A]">
                            <h3 className="font-semibold mb-2">Progres Pekerjaan</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Pantau status tiap pekerjaan dan progres tim dalam satu tampilan yang mudah dibaca.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A]">
                            <h3 className="font-semibold mb-2">Laporan & Analisis</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Dapatkan laporan pekerjaan dan performa tim untuk evaluasi dan perencanaan ke depan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="w-full bg-[#f9f9f9] dark:bg-[#111] py-20 px-6 lg:px-32 text-center">
                    <h2 className="text-2xl font-semibold mb-4 lg:text-4xl">Kontak Kami</h2>
                    <p className="max-w-2xl mx-auto mb-6 text-[#555] dark:text-[#ccc]">
                        Hubungi kami melalui email atau media sosial untuk pertanyaan dan dukungan.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row justify-center">
                        <a href="mailto:info@aplikasi.com" className="rounded-md border px-6 py-3 hover:bg-[#e0e0e0] dark:border-[#EDEDEC] dark:hover:bg-[#222]">Email</a>
                        <a href="https://www.tiktok.com/@aplikasi" target="_blank" className="rounded-md border px-6 py-3 hover:bg-[#e0e0e0] dark:border-[#EDEDEC] dark:hover:bg-[#222]">TikTok</a>
                        <a href="https://www.instagram.com/aplikasi" target="_blank" className="rounded-md border px-6 py-3 hover:bg-[#e0e0e0] dark:border-[#EDEDEC] dark:hover:bg-[#222]">Instagram</a>
                    </div>
                </section>
            </div>
        </>
    );
}

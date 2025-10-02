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
                    {/* Bisa tambahkan menu tambahan di sini */}
                </header>

                {/* Hero */}
                <section className="flex flex-col items-center justify-center text-center py-20 px-6 lg:py-32 lg:px-8 space-y-6 lg:space-y-8">
                    <h1 className="text-3xl font-semibold lg:text-5xl">
                        Selamat Datang di Aplikasi Manajemen Pekerjaan
                    </h1>
                    <p className="max-w-md text-sm lg:text-base text-[#555] dark:text-[#ccc]">
                        Aplikasi ini membantu tim dan perusahaan dalam mengelola tugas, proyek, dan progres pekerjaan dengan efektif.
                    </p>

                    <div className="flex gap-4">
                        {auth.user ? (
                            // ✅ Kalau user sudah login → hanya Dashboard
                            <Link
                                href={dashboard()}
                                className="rounded-md border border-[#19140035] px-6 py-3 text-sm font-medium text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b] dark:text-[#EDEDEC]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            // ✅ Kalau belum login → Register + Login
                            <>
                                <Link
                                    href={register()}
                                    className="rounded-md px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90"
                                >
                                    Registrasi
                                </Link>
                                <Link
                                    href={login()}
                                    className="rounded-md border px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 dark:border-[#EDEDEC]"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </section>

                {/* Tentang Kami */}
                <section className="w-full bg-[#f9f9f9] dark:bg-[#111] py-20 px-6 lg:px-32 text-center shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h2 className="text-2xl font-semibold mb-4 lg:text-4xl">Tentang Kami</h2>
                    <p className="max-w-2xl mx-auto text-[#555] :text-[#ccc]">
                        Aplikasi web ini dirancang untuk memudahkan manajemen pekerjaan dan proyek. 
                        Dengan fitur dashboard, penugasan, dan notifikasi, tim dapat bekerja lebih efisien, memantau progres pekerjaan, 
                        serta memastikan semua tugas selesai tepat waktu.
                    </p>
                </section>

                {/* Fitur */}
                <section className="w-full py-20 px-6 lg:px-32 text-center ">
                    <h2 className="text-2xl font-semibold mb-10 lg:text-4xl">Fitur Unggulan</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h3 className="font-semibold mb-2">Dashboard Admin/Manager</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Menampilkan ringkasan proyek, pekerjaan aktif, dan progres tim secara realtime.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h3 className="font-semibold mb-2">Manajemen Pekerjaan</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Input, update, dan pantau semua pekerjaan serta tugas tim dengan mudah.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h3 className="font-semibold mb-2">Penugasan & Notifikasi</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Menetapkan pekerjaan ke karyawan dan menerima notifikasi saat ada update atau deadline mendekat.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h3 className="font-semibold mb-2">Progres Pekerjaan</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Pantau status tiap pekerjaan dan progres tim dalam satu tampilan yang mudah dibaca.
                            </p>
                        </div>
                        <div className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h3 className="font-semibold mb-2">Laporan & Analisis</h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Dapatkan laporan pekerjaan dan performa tim untuk evaluasi dan perencanaan ke depan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full bg-gray-600 dark:bg-gray-800 text-white ">    
                    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-32 flex flex-col md:flex-row justify-between gap-10 md:gap-0 text-sm ">
                        {/* Logo */}
                        <div className="flex items-center md:flex-1">
                            <img
                                src=""
                                alt="UPI Logo"
                                className="h-10 mr-3"
                            />
                            <div className="hidden md:block text-xs">
                                <p>Universitas Pendidikan Indonesia</p>
                                <p className="text-[10px]">The Education University</p>
                            </div>
                        </div>

                        {/* Contact Us */}
                        <div className="md:flex-1">
                          <h4 className="font-semibold mb-3 border-b border-white w-30 pb-1 text-xl ">Contact Us</h4>
                            <p className="text-xs leading-relaxed ">
                                Universitas Pendidikan Indonesia<br />
                                Jl. Dr. Setiabudhi No. 229 Bandung 40154<br />
                                Jawa Barat - Indonesia<br />
                                E-mail: <a href="mailto:sekuniv_upi@upi.edu" className="underline">sekuniv_upi@upi.edu</a>
                            </p>
                        </div>

                        {/* Follow Us */}
                        <div className="md:flex-1">
                            <h4 className="font-semibold mb-3 border-b border-white w-25 pb-1 text-xl">Follow Us</h4>
                            <div className="flex space-x-4 text-xl">
                                {/* Icons */}
                                <a href="https://twitter.com/upiofficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                    </svg>
                                </a>
                                <a href="https://facebook.com/upiofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M22 12a10 10 0 1 0-11 9.95V14.89h-2v-3h2v-2c0-2 1-3 3-3h2v3h-1c-.5 0-1 .5-1 1v1h3l-1 3h-2v7.06A10 10 0 0 0 22 12z"/>
                                    </svg>
                                </a>
                                <a href="https://instagram.com/upiofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </a>
                                <a href="https://tiktok.com/@upiofficial" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M9 2a7 7 0 0 0 7 7v5a5 5 0 1 1-5-5V2z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black text-center text-xs py-3">
                        © Universitas Pendidikan Indonesia 2025
                    </div>
                </footer>
            </div>
        </>
    );
}



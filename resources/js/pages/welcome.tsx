import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/aos@next/dist/aos.js";
        script.onload = () => {
            // @ts-ignore
            AOS.init({ duration: 800, once: true });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
            </Head>

            <div className="flex flex-col items-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] w-full">

                {/* Header */}
                <header className="absolute top-6 right-6 flex gap-4 text-sm lg:top-8 lg:right-8">
                    {/* Menu tambahan bisa ditambahkan di sini */}
                </header>

                {/* Hero */}
                <section
                    className="flex flex-col items-center justify-center text-center py-20 px-6 lg:py-32 lg:px-8 space-y-6 lg:space-y-8"
                    data-aos="fade-up"
                >
                    <h1 className="text-3xl font-semibold lg:text-5xl">
                        Selamat Datang di Aplikasi Manajemen Pekerjaan
                    </h1>
                    <p className="max-w-md text-sm lg:text-base text-[#555] dark:text-[#ccc]">
                        Aplikasi ini membantu tim dan perusahaan dalam mengelola tugas, proyek, dan progres pekerjaan dengan efektif.
                    </p>

                    <div className="flex gap-4">
                        {auth.user ? (
                            // ✅ Jika sudah login
                            <Link
                                href={dashboard()}
                                className="rounded-md border border-[#19140035] px-6 py-3 text-sm font-medium text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b] dark:text-[#EDEDEC]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            // ✅ Jika belum login
                            <>
                                <Link
                                    href={register()}
                                    className="rounded-md px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                                >
                                    Registrasi
                                </Link>
                                <Link
                                    href={login()}
                                    className="rounded-md border px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:border-[#EDEDEC] transition"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </section>

                {/* Tentang Kami */}
                <section
                    className="w-full bg-[#f9f9f9] dark:bg-[#111] py-20 px-6 lg:px-32 text-center shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    data-aos="fade-up"
                >
                    <h2 className="text-2xl font-semibold mb-4 lg:text-4xl">Tentang Kami</h2>
                    <p className="max-w-2xl mx-auto text-[#555] dark:text-[#ccc]">
                        Aplikasi web ini dirancang untuk memudahkan manajemen pekerjaan dan proyek.
                        Dengan fitur dashboard, penugasan, dan notifikasi, tim dapat bekerja lebih efisien,
                        memantau progres pekerjaan, serta memastikan semua tugas selesai tepat waktu.
                    </p>
                </section>

                {/* Fitur */}
                <section
                    className="w-full py-20 px-6 lg:px-32 text-center"
                    data-aos="fade-up"
                >
                    <h2 className="text-2xl font-semibold mb-10 lg:text-4xl">Fitur Unggulan</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Dashboard Admin/Manager",
                                desc: "Menampilkan ringkasan proyek, pekerjaan aktif, dan progres tim secara realtime."
                            },
                            {
                                title: "Manajemen Pekerjaan",
                                desc: "Input, update, dan pantau semua pekerjaan serta tugas tim dengan mudah."
                            },
                            {
                                title: "Penugasan & Notifikasi",
                                desc: "Menetapkan pekerjaan ke karyawan dan menerima notifikasi saat ada update atau deadline mendekat."
                            },
                            {
                                title: "Progres Pekerjaan",
                                desc: "Pantau status tiap pekerjaan dan progres tim dalam satu tampilan yang mudah dibaca."
                            },
                            {
                                title: "Laporan & Analisis",
                                desc: "Dapatkan laporan pekerjaan dan performa tim untuk evaluasi dan perencanaan ke depan."
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                className="p-6 border rounded-md dark:border-[#3E3E3A] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                            >
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-[#555] dark:text-[#ccc]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full bg-gray-600 dark:bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-32 flex flex-col md:flex-row justify-between gap-10 md:gap-0 text-sm">

                        {/* Logo */}
                        <div className="flex items-center md:flex-1">
                            <img
                                src="/images/upi-logo.png"
                                alt="UPI Logo"
                                className="h-10 mr-3"
                            />
                            <div className="hidden md:block text-xs">
                                <p>Universitas Pendidikan Indonesia</p>
                                <p className="text-[10px]">The Education University</p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="md:flex-1">
                            <h4 className="font-semibold mb-3 border-b border-white w-30 pb-1 text-xl">Contact Us</h4>
                            <p className="text-xs leading-relaxed">
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
                                {[
                                    { href: "https://twitter.com/upiofficial", path: "M23 3a10.9..." },
                                    { href: "https://facebook.com/upiofficial", path: "M22 12a10..." },
                                    { href: "https://instagram.com/upiofficial", path: "M7 2C4.2..." },
                                    { href: "https://tiktok.com/@upiofficial", path: "M9 2a7..." }
                                ].map((icon, idx) => (
                                    <a key={idx} href={icon.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d={icon.path} />
                                        </svg>
                                    </a>
                                ))}
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

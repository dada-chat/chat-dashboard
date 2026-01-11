"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { NAVIGATION } from "@/constants/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const { accessToken, user, setAuth } = useAuthStore();

  //  사용자 정보 확인
  useEffect(() => {
    if (accessToken && user) {
      router.replace(NAVIGATION.HOME);
    }
  }, [accessToken, user, router]);

  return (
    <>
      <Header />
      <main className="w-full bg-white text-gray-800">
        {/* <section className="relative overflow-hidden bg-gradient-to-t from-primary-dark via-primary-100 to-primary-lightest"> */}
        <section className="relative overflow-hidden rounded-2xl mx-6 py-24 bg-primary">
          <div className="flex flex-col gap-16 mx-auto max-w-6xl text-center">
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-4 text-white">
                <h1 className="text-4xl font-bold">
                  웹사이트에 위젯을 달고
                  <br />
                  고객 문의를 한 곳에서 관리하세요.
                </h1>
                <p className="text-lg">
                  고객은 웹사이트 위젯으로 문의하고,
                  <br />
                  우리는 대시보드에서 실시간으로 답변할 수 있어요.
                </p>
              </div>
              <div>
                <Link href={NAVIGATION.SIGNIN}>
                  <Button variant="dark" className="!w-auto">
                    바로 시작하기
                  </Button>
                </Link>
              </div>
            </div>

            {/* 메인 대시보드 이미지 */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="h-[280px] w-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                대시보드 이미지 영역
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUE STATEMENT ================= */}
        <section className="py-24">
          <div className="flex flex-col gap-16 mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold">
                여기저기 흩어져 있는 고객 문의,
                <br />
                지금은 어떻게 확인하고 있나요?
              </h2>
              <p className="text-lg text-gray-600">
                이메일, 전화 등 흩어진 고객 문의를
                <br />
                하나의 대시보드에 모아 관리해 보세요!
              </p>
            </div>
          </div>
        </section>

        {/* ================= MAIN FEATURE ================= */}
        <section className="mx-6 py-24 rounded-2xl bg-primary-softer">
          <div className="flex flex-col gap-16 mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold">
                다다챗은 고객 문의와 응대를 위한
                <br />
                주요 기능을 담은 서비스입니다.
              </h2>
              <p className="text-lg text-gray-600">
                고객은 위젯으로 문의하고,
                <br />
                매니저는 대시보드에서 답변할 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "실시간 채팅",
                  content: "채팅방을 통해, 고객과 바로 대화할 수 있어요.",
                  img: "img_feature1.png",
                },
                {
                  title: "웹사이트 위젯",
                  content: "간단히 설치해서, 바로 사용할 수 있어요.",
                  img: "img_feature2.png",
                },
                {
                  title: "초대 메일",
                  content: "메일 인증을 통해, 매니저를 초대할 수 있어요.",
                  img: "img_feature3.png",
                },
                {
                  title: "관리 대시보드",
                  content: "CS 문의와 답변을 한 곳에서 관리할 수 있어요.",
                  img: "img_feature4.png",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-10 pb-2.5 bg-white shadow-lg"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="">{item.content}</p>
                  </div>
                  <div className="flex justify-end">
                    <Image
                      src={`/images/landing/${item.img}`}
                      alt={item.title}
                      width={320}
                      height={320}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURE ================= */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold">앞으로 추가될 기능들</h2>
              <p className="text-lg text-gray-600">
                서비스 구조를 고려해 점진적으로 확장할 계획입니다.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "문의했던 고객 정보 조회",
                "내부용 사내 메세지",
                "채팅 파일 첨부",
              ].map((text, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="h-32 rounded-lg bg-gray-100 mb-4" />
                  <p className="font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-6 py-24 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-primary-light">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-9 text-center">
              <h2 className="text-3xl font-bold">
                고객 문의 채팅 서비스,&nbsp;
                <strong className="text-white">DadaChat</strong>
                <br />
                지금 바로 확인해보세요!
              </h2>
              <div>
                <Link href={NAVIGATION.SIGNIN}>
                  <Button variant="dark" className="!w-auto">
                    바로 시작하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

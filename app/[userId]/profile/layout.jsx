"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "../../../components/dark-mode-toggle";
import { LuLayers, LuLogOut } from "react-icons/lu";
import AsideProfile from "../../components/ui/nav/AsideProfile";
import MobileMenuBar from "../../components/ui/nav/MobileMenuBar";
import User from "../../components/ui/cards/User";
import Loader from "../../components/loaders/Loader";
function layout({ children }) {
  // console.log(path);
  const { isLoading, isAuthenticated, getUser, getPermission } =
    useKindeBrowserClient();
  const user = getUser();
  const isAdmin = getPermission("admin:create").isGranted;

  const pathName = usePathname();
  const router = useRouter();
  const { userId } = useParams();
  const profileRoutes = [
    {
      path: `/${userId}`,
      name: "Home",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/bio`,
      name: "Bio",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/experiences`,
      name: "Experiences",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/projects`,
      name: "Projects",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/skills`,
      name: "Skills",
      icon: <LuLayers size={20} />,
    },
    {
      path: `/${userId}/profile/testimonials`,
      name: "Testimonials",
      icon: <LuLayers size={20} />,
    },
  ];

  return (
    <>
      {isAuthenticated && (
        <section className="w-screen max-w-full h-auto min-h-screen flex justify-center items-start gap-10 relative max-sm:static max-sm:flex-col max-sm:items-center max-md:flex-col max-md:items-center">
          <AsideProfile
            className={
              "fixed left-0 top-0 min-h-screen flex flex-col lg:flex max-sm:hidden max-md:hidden"
            }
          >
            <div className="w-full flex flex-col justify-center items-center gap-20">
              <div className="w-full m-auto">
                {isLoading ? (
                  <Loader />
                ) : (
                  <User
                    name={`${user?.given_name} ${user?.family_name}`}
                    picture={user?.picture}
                    isAdmin={isAdmin}
                  />
                )}
              </div>

              <ul className="w-full flex flex-col  m-auto">
                {profileRoutes.map((route, index) => {
                  const activeRoute = pathName?.split("/")[3];
                  return (
                    <li
                      key={index}
                      className="w-full flex justify-start items-center gap-10 p-2 hover:text-muted-foreground duration-150"
                    >
                      {activeRoute === route.name.toLocaleLowerCase() ? (
                        <Link href={route.path}>
                          <h1
                            className={`w-full flex gap-2 rounded-md text-purple-400  justify-center items-center`}
                          >
                            <span className="  font-semibold text-md">
                              {route.icon}
                            </span>
                            <span className="font-semibold text-md">
                              {route.name}
                            </span>
                          </h1>
                        </Link>
                      ) : (
                        <Link
                          className={`w-full flex gap-2 rounded-md`}
                          href={route.path}
                        >
                          <span className="font-semibold text-md">
                            {route.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col justify-start items-start gap-2  mt-12">
              <ModeToggle theme={"show"} />
              <LogoutLink className="w-full flex gap-2 hover:text-purple-500 duration-150 p-2">
                <span>
                  <LuLogOut size={20} />
                </span>
                logout
              </LogoutLink>
            </div>
          </AsideProfile>

          <MobileMenuBar className={"hidden max-sm:flex max-md:flex "}>
            <User
              name={`${user?.given_name} ${user?.family_name}`}
              picture={user?.picture}
              isAdmin={isAdmin}
            />
            <ul className="w-full flex flex-col items-center justify-center self-center gap-2 mt-16">
              {profileRoutes.map((route, index) => {
                const activeRoute = pathName.split("/")[3];
                return (
                  <li
                    key={index}
                    className="w-full flex justify-center items-center self-center gap-10 p-2 hover:text-muted-foreground duration-150"
                  >
                    {activeRoute === route.name.toLocaleLowerCase() ? (
                      <Link
                        href={route.path}
                        className={`w-full flex justify-center items-center gap-2 rounded-md`}
                      >
                        <h1
                          className={`w-full flex gap-2 rounded-md text-purple-400  justify-center items-center`}
                        >
                          <span className="font-semibold text-md">
                            {route.name}
                          </span>
                        </h1>
                      </Link>
                    ) : (
                      <Link
                        className={`w-full flex justify-center items-center gap-2 rounded-md`}
                        href={route.path}
                      >
                        <span className="font-semibold text-md">
                          {route.name}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="flex justify-center items-center  ">
                <ModeToggle theme={"show"} />
              </li>
              <li className="w-full flex flex-col justify-center items-center  gap-8 p-2  mt-16">
                <LogoutLink className="w-full flex justify-center items-center gap-2 hover:text-muted-foreground duration-150 p-2">
                  <span>
                    <LuLogOut size={20} />
                  </span>
                  logout
                </LogoutLink>
              </li>
            </ul>
          </MobileMenuBar>
          <main className="w-3/4 mt-4 max-md:w-full   ml-auto  absolute top-0 right-0 max-sm:static max-md:static">
            {children}
          </main>
        </section>
      )}
    </>
  );
}

export default layout;

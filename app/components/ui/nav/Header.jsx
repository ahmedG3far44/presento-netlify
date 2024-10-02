import Link from "next/link";
import credentials from "../../../credentials/credentials";
import ShareBtn from "../cards/ShareBtn";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { ModeToggle } from "../../../../components/dark-mode-toggle";
import { HiOutlineLogout } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";

async function Header({ picture }) {
  const { isLogged, user, isAdmin } = await credentials();

  return (
    <header className="w-3/4 m-auto p-4 flex justify-center items-center   max-sm:w-full ">
      <div className="mr-auto">
        <div className="flex justify-start items-center gap-4">
          <Image
            src={picture ? picture : user?.picture}
            width={40}
            height={40}
            alt="profile user image"
            className="w-10 h-10 rounded-full object-cover border-2 "
          />
          <h1 className="text-muted-foreground">{user?.given_name}</h1>
        </div>
      </div>

      <nav
        className={`flex  items-center gap-4 mr-10 max-sm:hidden max-md:hidden ${
          isLogged ? "justify-end" : "justify-center"
        }`}
      >
        <Link href={`/${user?.id}/#about`}>About</Link>
        <Link href={`/${user?.id}/#experiences`}>Experiences</Link>
        <Link href={`/${user?.id}/#projects`}>Projects</Link>
        <Link href={`/${user?.id}/#skills`}>Skills</Link>
      </nav>

      <div className="ml-auto ">
        {isLogged ? (
          <div className="flex-1 flex justify-center items-center gap-2 max-md:gap-0">
            <ModeToggle theme={"none"} />
            {isAdmin && isLogged ? (
              <Link
                className="hover:bg-secondary p-2 rounded-md duration-150"
                href={`/${user?.id}/dashboard/users`}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  className="hover:bg-secondary p-2 rounded-md duration-150"
                  href={`/${user?.id}/profile/bio`}
                >
                  <LuSettings size={20} />
                </Link>
              </>
            )}
            <LogoutLink className="hover:bg-secondary p-2 rounded-md duration-150">
              <HiOutlineLogout size={20} />
            </LogoutLink>
            <ShareBtn />
          </div>
        ) : (
          <ShareBtn />
        )}
      </div>
    </header>
  );
}

export default Header;

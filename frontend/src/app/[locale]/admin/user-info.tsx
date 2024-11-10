"use client";

import UserUsecase from "@/module/user/application/userUsecase";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";
import UserViewModel from "@/module/user/presenter/userViewModel";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function UserInfo({
  className,
}: Props) {
  const [user, setUser] = useState<UserViewModel | null>(null);

  useEffect(() => {
    const usecase = new UserUsecase(new UserRepoImpl());
    usecase.getCurrentUser()
      .then((user) => setUser(new UserViewModel(user)))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className={`${className ?? ""} flex flex-col`}>
      <span>{`UID: ${user?.id}`}</span>
      <span>{`Name: ${user?.chineseName}`}</span>
      <span>{`Role: ${user?.roleString}`}</span>
    </div>
  );
}

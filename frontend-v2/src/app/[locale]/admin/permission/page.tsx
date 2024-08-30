"use client";

import UserUsecase from "@/module/user/application/userUsecase";
import UserRoleEnum from "@/module/user/domain/userRoleEnum";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";
import UserViewModel from "@/module/user/presenter/userViewModel";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function PermissionPage() {
  const trans = useTranslations("Permission");

  const usecase = new UserUsecase(new UserRepoImpl());

  const [users, setUsers] = useState<UserViewModel[]>([]);

  async function fetchAll() {
    const entities = await usecase.getAllUsers({});
    setUsers(entities.map((entity) => new UserViewModel(entity)));
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function handleEdit(userId: string, role: UserRoleEnum) {
    try {
      await usecase.updateUser(userId, role);
      await fetchAll();
    } catch {
      alert("Failed to update user");
    }
  }

  async function handleDelete(userId: string) {
    try {
      await usecase.deleteUser(userId);
      await fetchAll();
    } catch {
      alert("Failed to delete user");
    }
  }

  return (
    <div>
      <h1>{trans("title")}</h1>
      <div className="overflow-x-auto">
        <Table.Root className="mt-6" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{trans("table_name")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_uid")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_edit")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              users.map((user) => (
                <Table.Row key={user.id} align="center">
                  <Table.Cell>{user.chineseName}</Table.Cell>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>
                    <select className="border rounded-sm h-7"
                      value={UserRoleEnum[user.role]}
                      onChange={(event) => handleEdit(
                        user.id, UserRoleEnum[event.target.value as keyof typeof UserRoleEnum]
                      )}
                    >
                      {
                        options.map((option, index) => (
                          <option key={index} value={UserRoleEnum[option]}>{UserRoleEnum[option]}</option>
                        ))
                      }
                    </select>
                  </Table.Cell>
                  <Table.Cell>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="size-3 cursor-pointer text-red-600"
                      onClick={() => { handleDelete(user.id) }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

const options = [
  UserRoleEnum.Normal,
  UserRoleEnum.StudentB,
  UserRoleEnum.StudentA,
  UserRoleEnum.Admin
];

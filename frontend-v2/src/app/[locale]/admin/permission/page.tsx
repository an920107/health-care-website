"use client";

import Pager from "@/components/pager";
import SearchBar from "@/components/search-bar";
import PagerEntity from "@/module/pager/domain/pagerEntity";
import UserUsecase from "@/module/user/application/userUsecase";
import UserRoleEnum from "@/module/user/domain/userRoleEnum";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";
import UserViewModel from "@/module/user/presenter/userViewModel";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const usecase = new UserUsecase(new UserRepoImpl());

export default function PermissionPage() {
  const trans = useTranslations("Permission");

  const [users, setUsers] = useState<UserViewModel[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [pagerEntity, setPagerEntity] = useState(new PagerEntity({ currentPage: 1, totalPage: 1 }));

  async function fetchAll() {
    const [entities, pager] = await usecase.getAllUsers({
      search: searchText,
      page: pagerEntity.currentPage,
    });
    setUsers(entities.map((entity) => new UserViewModel(entity)));
    setPagerEntity(prev => new PagerEntity({ currentPage: prev.currentPage, totalPage: pager.totalPage }));
  }

  useEffect(() => {
    fetchAll().catch(console.error);
  }, [pagerEntity.currentPage, searchText]);

  function handleSearchSubmit(text: string) {
    setPagerEntity(prev => new PagerEntity({ currentPage: 1, totalPage: prev.totalPage }));
    setSearchText(text);
  }

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
      <SearchBar className="max-md:hidden mt-6" onSubmit={handleSearchSubmit} />
      <div className="overflow-x-auto">
        <Table.Root className="mt-4" variant="surface">
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
      <div className="mt-4 flex flex-row justify-end">
        <Pager entity={pagerEntity} onChange={setPagerEntity} />
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

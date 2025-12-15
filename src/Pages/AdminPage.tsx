import { useEffect, useState } from "react";
import { db } from "../Config/FirebaseConfig";
import { ref, onValue, update } from "firebase/database";
import type { User } from "../Components/Context/AuthContext";

type Role = "user" | "admin" | "encoder" | "cashier";

const ALL_ROLES: Role[] = ["user", "admin", "encoder", "cashier"];

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(db, "users");

    const unsub = onValue(usersRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.val();

      const formatted: User[] = Object.keys(data).map((uid) => ({
        uid,
        name: data[uid].name ?? "No Name",
        email: data[uid].email ?? "No Email",
        role: data[uid].role ?? ["user"],
      }));

      setUsers(formatted);
    });

    return () => unsub();
  }, []);

  const toggleRole = async (uid: string, role: Role) => {
    const user = users.find((u) => u.uid === uid);
    if (!user) return;

    const updatedRoles = user.role.includes(role)
      ? user.role.filter((r) => r !== role)
      : [...user.role, role];

    await update(ref(db, `users/${uid}`), {
      role: updatedRoles,
    });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Admin – User Management
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3 text-sm text-gray-600">{user.email}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {ALL_ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => toggleRole(user.uid, role)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition
                          ${
                            user.role.includes(role)
                              ? "bg-primary text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }
                        `}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// src/components/UserList.tsx
import React, { useEffect, useState } from 'react'
// import { getUsers } from '../api/user'

const UserList: React.FC = () => {
  // const [users, setUsers] = useState<Array>(1)

  useEffect(() => {
    const fetchUsers = async () => {
      // const data = await getUsers()
      // setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <ul>
        {/* {users.map(user => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.email}
          </li>
        ))} */}
      </ul>
    </div>
  )
}

export default UserList

import React, { useState } from 'react';

const User = () => {
  const [profile, setProfile] = useState(null)

  return (
    <div className="user">
      <h2>User Details</h2>
    </div>
  )
}

export default User;
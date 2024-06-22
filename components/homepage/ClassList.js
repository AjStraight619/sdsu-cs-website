import React from 'react'

const classes = [
  { name: 'Prof.A', link: '/profA' },
  { name: 'Prof.B', link: '/profB' },
  { name: 'Prof.C', link: '/profC' },
]

const ClassList = () => {
  return (
    <div className="classList">
      <h2 className="capitalize font-poppins pb-5">
        Participating Professors...
      </h2>

      <ul className="capitalize">
        {classes.map((classItem, index) => (
          <li key={index}>
            <a href={classItem.link}>{classItem.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClassList

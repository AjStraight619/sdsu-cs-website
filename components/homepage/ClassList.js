import React from 'react'

const classes = [
  { name: 'CS150 : Introductory Computer Programming', link: '/cs150' },
  { name: 'CS210 : Data Structures', link: '/ds' },
  { name: 'CS460 : Algorithms', link: '/algorithms' },
  {
    name: 'CS250 : Introduction to Software Systems',
    link: '/cs250',
  },
]

const ClassList = () => {
  return (
    <div className="classList">
      <h2 className="capitalize font-poppins pb-5">Participating Classes</h2>

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

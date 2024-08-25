import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        console.log(response.data)
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDeleteCourse = (id) => {
    axios.delete(`http://localhost:8080/api/courses/${id}`)
      .then(response => {
        console.log(response.data);
        setCourses(courses.filter(course => course.id !== id))
      })
      .catch(
        error => { console.log(error) }
      )
  }

  return (
    <div className=''>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <table className="w-full table-auto border border-black">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-4 py-2 ">Title</th>
            <th className="px-4 py-2 ">Course Code</th>
            <th className="px-4 py-2 ">Description</th>
            <th className="px-4 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} className="hover:bg-gray-100 border border-black">
              <td className="px-4 py-2 text-center border border-black">{course.title}</td>
              <td className="px-4 py-2 text-center border border-black">{course.course_code}</td>
              <td className="px-4 py-2 text-center border border-black">{course.description}</td>
              <td className="px-4 py-2 text-center border border-black">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;

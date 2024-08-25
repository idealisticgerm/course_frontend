import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstanceList() {
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch instances
    axios.get('http://localhost:8080/api/instances')
      .then(response => {
        setInstances(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the instances!", error);
      });

    // Fetch courses
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDeleteInstance = (id) => {
    axios.delete(`http://localhost:8080/api/instances/${id}`)
      .then(response => {
        console.log(response.data);
        setInstances(instances.filter(instance => instance.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the instance!", error);
      });
  };

  // Helper function to get course name by ID
  const getCourseNameById = (courseId) => {
    const course = courses.find(course => course.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Instances</h1>
      <table className="w-full table-auto border border-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-black">Year</th>
            <th className="px-4 py-2 border border-black">Semester</th>
            <th className="px-4 py-2 border border-black">Course Name</th>
            <th className="px-4 py-2 border border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(instance => (
            <tr key={instance.id} className="hover:bg-gray-100 border border-black">
              <td className="px-4 py-2 text-center border border-black">{instance.year}</td>
              <td className="px-4 py-2 text-center border border-black">{instance.semester}</td>
              <td className="px-4 py-2 text-center border border-black">
                {getCourseNameById(instance.courseId)}
              </td>
              <td className="px-4 py-2 text-center border border-black">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteInstance(instance.id)}
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

export default InstanceList;

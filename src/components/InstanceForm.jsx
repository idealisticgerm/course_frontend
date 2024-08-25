import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseDeliveryForm = () => {
  const [course, setCourse] = useState({
    title: '',
    course_code: '',
    description: ''
  });

  const [courses, setCourses] = useState([]);
  const [instance, setInstance] = useState({
    year: '',
    semester: '',
    courseId: ''
  });

  // Fetch courses on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/courses', course, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCourse({
        title: '',
        course_code: '',
        description: ''
      });
      console.log("Course added:", response.data);
    } catch (error) {
      console.error("There was an error adding the course!", error);
    }
  };

  const handleInstanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/instances', instance, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setInstance({
        year: '',
        semester: '',
        courseId: ''
      });
      console.log("Instance added:", response.data);
    } catch (error) {
      console.error("There was an error adding the instance!", error);
    }
  };

  return (
    <div className='flex items-center my-10 '>
      <div className='flex flex-col w-1/2 '>
        <div className='text-2xl font-semibold text-center '>Form</div>

        {/* Course Form */}
        <form onSubmit={handleCourseSubmit} className="max-w-lg w-full mx-auto  bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-gray-700 font-medium mb-2">Course Title:</label>
            <input
              type="text"
              id="courseTitle"
              required
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseCode" className="block text-gray-700 font-medium mb-2">Course Code:</label>
            <input
              type="text"
              id="courseCode"
              value={course.course_code}
              required
              onChange={(e) => setCourse({ ...course, course_code: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseDescription" className="block text-gray-700 font-medium mb-2">Course Description:</label>
            <input
              type="text"
              id="courseDescription"
              value={course.description}
              required
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              className="w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>

      {/* Instance Form */}
      <div className='flex flex-col w-1/2'>
        <div className='text-2xl font-semibold text-center'>Add Instance</div>
        <form onSubmit={handleInstanceSubmit} className="max-w-lg w-full mx-auto  bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <label htmlFor="courseId" className="block text-gray-700 font-medium mb-2">Select Course:</label>
            <select
              id="courseId"
              required
              value={instance.courseId}
              onChange={(e) => setInstance({ ...instance, courseId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Year:</label>
            <input
              type="number"
              id="year"
              required
              value={instance.year}
              onChange={(e) => setInstance({ ...instance, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="semester" className="block text-gray-700 font-medium mb-2">Semester:</label>
            <input
              type="number"
              id="semester"
              required
              value={instance.semester}
              onChange={(e) => setInstance({ ...instance, semester: e.target.value })}
              className="w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Instance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseDeliveryForm;

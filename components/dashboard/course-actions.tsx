'use client';
import React, { useRef } from 'react';
import { CirclePlusIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { addCourse, deleteCourse } from '@/actions/courses';
import { useCallback, useEffect, useOptimistic, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ErrorMessage } from '../ui/form-messages';
import { nanoid } from 'nanoid';
import { Label } from '@radix-ui/react-label';
import SubmitButton2 from '../ui/submit-button2';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { motion } from 'framer-motion';
import DeleteCourse from './delete-course';

type ProfessorOptionsProps = {
  courses: Course[] | undefined;
  currentCourse: string;
  isEditable: boolean;
};

type Course = {
  id: string;
  title: string;
  pending?: boolean;
};

type Action =
  | { type: 'ADD'; payload: Course }
  | { type: 'REMOVE'; payload: string };

function reducer(state: Course[] | undefined, action: Action) {
  if (!state) return [];
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(course => course.id !== action.payload);
    default:
      return state;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function CourseActions({
  courses,
  currentCourse,
  isEditable,
}: ProfessorOptionsProps) {
  const [input, setInput] = useState('');
  const [optimisticCourses, dispatch] = useOptimistic(courses, reducer);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePathChange = useCallback(
    (course: string) => {
      const params = new URLSearchParams(searchParams);
      if (course) {
        params.set('course', course);
      } else {
        params.delete('course');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const handleInputChange = (input: string) => {
    validateStringDebounced(input);
    setInput(input);
  };

  // Validate string entered for course name
  const validateStringFormat = (input: string): string => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 2) return '';
    if (!trimmedInput.startsWith('CS')) {
      return "Must start with 'CS'";
    }
    if (!trimmedInput.includes('-')) {
      return "Must contain '-'";
    }
    const parts = trimmedInput.split('-');
    if (parts.length !== 2 || parts[0] !== 'CS') {
      return 'Invalid format';
    }
    const sectionNumber = Number(parts[1]);
    if (!Number.isInteger(sectionNumber)) {
      return 'Must end with a valid section number';
    }
    return '';
  };

  // Validate input every one second when user types
  const validateStringDebounced = useDebouncedCallback((input: string) => {
    const error = validateStringFormat(input);
    setError(error);
  }, 1000);

  // Add course to db and update optimistic courses for immediate feedback
  const handleAddCourse = async (formData: FormData) => {
    setError('');
    const coursename = formData.get('courseName') as string;
    const error = validateStringFormat(coursename);
    if (error) {
      setError(error);
      return;
    }
    const courseExists = optimisticCourses?.find(c => c.title === coursename);
    if (courseExists) {
      setError('This course already exists');
      return;
    }
    dispatch({
      type: 'ADD',
      payload: { id: nanoid(), title: coursename, pending: true },
    });
    const { error: addCourseError, courseName } = await addCourse(formData);

    setIsPopoverOpen(false);
    if (courseName) {
      handlePathChange(courseName);
    }
    console.log('courseName: ', courseName);
    console.log(
      'error: ',
      addCourseError,
      'type of error: ',
      typeof addCourseError,
    );
    if (addCourseError) {
      toast.error('Something went wrong', {
        description: addCourseError,
        duration: 4000,
      });
    } else if (courseName) {
      toast('Created course', {
        description: `New course: ${courseName}`,
        duration: 4000,
      });
    }
    setInput('');
  };

  const handleDeleteCourse = useCallback(
    async (formData: FormData) => {
      console.log('in handleDeleteCourse');
      const courseId = formData.get('courseId') as string;
      console.log('course id: ', courseId);
      if (!courseId) {
        return;
      }

      dispatch({ type: 'REMOVE', payload: courseId });
      const { success, error } = await deleteCourse(courseId);
      if (success) {
        handlePathChange('');
        toast('Successfully deleted course');
      } else if (error) {
        toast('Something went wrong', {
          description: error,
        });
      }
    },
    [dispatch, handlePathChange],
  );

  return (
    <Card className="w-full sm:w-1/2 relative self-start">
      {isEditable && (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              className="flex items-center gap-x-1 absolute top-2 right-2"
              variant="outline"
              onClick={() => setIsPopoverOpen(true)}
            >
              <CirclePlusIcon size={17} />
              <span>Add Course</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-2">
            <div className="flex flex-col space-y-2">
              {error && <ErrorMessage message={error} />}
              <form className="space-y-4" action={handleAddCourse}>
                <Label>Course name</Label>
                <div className="flex items-center gap-x-2">
                  <Input
                    placeholder="CS-150"
                    value={input}
                    onChange={e => handleInputChange(e.target.value)}
                    name="courseName"
                    type="text"
                  />
                  <SubmitButton2 className="w-1/4" size="sm" variant="outline">
                    Add
                  </SubmitButton2>
                </div>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <CardHeader>
        <CardTitle>Course Manager</CardTitle>
        <CardDescription>Manage your courses</CardDescription>
      </CardHeader>
      <CardContent>
        {optimisticCourses?.length === 0 && (
          <div className="text-sm text-muted-foreground pt-1">
            Start by adding courses.
          </div>
        )}
        <motion.ul
          className="grid grid-cols-2 gap-2 pt-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {optimisticCourses?.map(course => (
            <motion.li
              key={course.id}
              onClick={() => handlePathChange(course.title)}
              className={`${
                course.pending
                  ? 'text-muted-foreground '
                  : 'text-black hover:cursor-pointer'
              } ${
                currentCourse === course.title ? 'bg-muted py-1' : 'py-2'
              } px-2 rounded-md transition-colors duration-300 relative w-full hover:bg-muted`}
              variants={course.pending ? {} : itemVariants}
              initial={course.pending ? false : 'hidden'}
              animate={course.pending ? false : 'visible'}
            >
              <div className="h-full flex items-center justify-between">
                <span
                  className={`${
                    currentCourse === course.title
                      ? 'underline text-bright-red'
                      : ''
                  }`}
                >
                  {course.title}
                </span>
                {currentCourse === course.title && (
                  <DeleteCourse
                    courseId={course.id}
                    handleDeleteCourse={handleDeleteCourse}
                  />
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}

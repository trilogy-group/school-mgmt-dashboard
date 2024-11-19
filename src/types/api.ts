export interface BaseResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface Organization {
  id: string;
  name: string;
  type: 'DEPARTMENT' | 'DISTRICT' | 'LOCAL' | 'NATIONAL' | 'SCHOOL' | 'STATE';
  parent_id?: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  given_name: string;
  middle_name?: string;
  family_name: string;
  email: string;
  phone?: string;
  password?: string;
  preferred_first_name?: string;
  preferred_last_name?: string;
  pronouns?: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  course_code: string;
  org_id: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  title: string;
  class_code: string;
  class_type: 'HOMEROOM' | 'SCHEDULED' | 'PATTERN';
  course_id: string;
  school_id: string;
  location?: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  updated_at: string;
}

export interface AcademicSession {
  id?: string;
  title: string;
  start_date: string;
  end_date: string;
  type: 'GRADING_PERIOD' | 'SCHOOL_YEAR' | 'SEMESTER' | 'TERM';
  parent_id?: string;
  school_year?: string;
  org_id?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'TO_BE_DELETED';
  created_at?: string;
}

// Add other interfaces for Course, Class, Enrollment, AcademicSession etc. 
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  userRole: 'student', // 'student' | 'instructor'
  setUserRole: (role) => set({ userRole: role }),

  selectedCourseId: 'CRS-101',
  selectedLessonId: 'LES-101',

  courses: [
    {
      id: 'CRS-101',
      code: 'CS-402',
      title: 'Advanced Distributed Consensus & Raft Protocols',
      department: 'Computer Science Faculty',
      instructor: 'Prof. Julian Sterling, Ph.D.',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive study of fault-tolerant replicated state machines, Paxos variants, Byzantine fault detection, and real-time quorum consensus.',
      enrolledStudents: 142,
      completionRate: 74,
      modules: [
        {
          id: 'MOD-1',
          title: 'Module 1: Foundations of Fault Tolerance',
          lessons: [
            {
              id: 'LES-101',
              title: '1.1 Replicated State Machines Architecture',
              type: 'video', // 'video' | 'pdf'
              duration: '28 min',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              content: 'In this foundational lecture, we formalize the abstraction of State Machine Replication (SMR) under crash-fault assumptions.',
              completed: true
            },
            {
              id: 'LES-102',
              title: '1.2 Formal Raft Proofs & Safety Invariants',
              type: 'pdf',
              duration: '15 pages',
              content: 'Academic reading: Ongaro & Ousterhout (2014) - In Search of an Understandable Consensus Algorithm.',
              completed: true
            }
          ]
        },
        {
          id: 'MOD-2',
          title: 'Module 2: Leader Election & Log Replication',
          lessons: [
            {
              id: 'LES-201',
              title: '2.1 Split-Brain Prevention & Term Synchronization',
              type: 'video',
              duration: '34 min',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              content: 'Analyzing randomized election timeouts and heartbeats in high-latency networked clusters.',
              completed: false
            }
          ]
        }
      ],
      quiz: {
        id: 'QZ-101',
        title: 'Midterm Assessment: Raft Safety & Quorum',
        questions: [
          {
            id: 'q1',
            text: 'In Raft, what condition ensures that a leader will never overwrite or truncate its own log entries?',
            options: [
              'Leader Append-Only property',
              'Randomized Heartbeat Election',
              'Byzantine Fault Masking',
              'Dynamic Membership Reconfiguration'
            ],
            correctIndex: 0
          },
          {
            id: 'q2',
            text: 'What is the minimum quorum size required for a cluster of 5 distributed nodes?',
            options: ['2 nodes', '3 nodes', '4 nodes', '5 nodes'],
            correctIndex: 1
          }
        ]
      },
      assignments: [
        {
          id: 'ASN-101',
          title: 'Lab 2: Implement Leader Election in Go',
          dueDate: '2026-04-05',
          points: 100,
          submitted: true,
          submissionDate: '2026-03-22',
          grade: 96,
          feedback: 'Exemplary handle on randomized timer backoff. Passed all 25 unit test cases without deadlock.'
        }
      ],
      forumPosts: [
        {
          id: 'POST-1',
          author: 'Devon K. (Graduate Researcher)',
          date: 'Yesterday at 3:14 PM',
          title: 'Question regarding Figure 8 corner case in the Raft paper',
          body: 'When an old leader crashes before committing an entry from a prior term, why can the new leader not directly commit it by counting replicas?',
          repliesCount: 4
        }
      ]
    },
    {
      id: 'CRS-102',
      code: 'NEURO-310',
      title: 'Neural Dynamics & Computational Cognitive Models',
      department: 'Biomedical Engineering',
      instructor: 'Dr. Elena Rostova',
      coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
      description: 'Mathematical formulation of Hodgkin-Huxley ionic conductance equations and spiking neural network architectures.',
      enrolledStudents: 98,
      completionRate: 61,
      modules: [
        {
          id: 'MOD-201',
          title: 'Module 1: Biophysics of the Action Potential',
          lessons: [
            {
              id: 'LES-301',
              title: '1.1 Voltage-Gated Ion Channel Thermodynamics',
              type: 'video',
              duration: '42 min',
              content: 'Derivation of the Nernst and Goldman-Hodgkin-Katz equilibrium potentials.',
              completed: false
            }
          ]
        }
      ],
      quiz: {
        id: 'QZ-201',
        title: 'Equilibrium Potentials Check',
        questions: [
          {
            id: 'q1',
            text: 'What is the primary ion responsible for resting membrane potential in mammalian neurons?',
            options: ['Potassium (K+)', 'Sodium (Na+)', 'Calcium (Ca2+)', 'Chloride (Cl-)'],
            correctIndex: 0
          }
        ]
      },
      assignments: [],
      forumPosts: []
    }
  ],

  // Actions
  setSelectedCourseId: (id) => set({ selectedCourseId: id }),
  setSelectedLessonId: (id) => set({ selectedLessonId: id }),

  markLessonComplete: (courseId, lessonId) => set((state) => ({
    courses: state.courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
          }))
        };
      }
      return c;
    })
  })),

  addForumPost: (courseId, post) => set((state) => ({
    courses: state.courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          forumPosts: [
            {
              ...post,
              id: `POST-${Date.now()}`,
              date: 'Just now',
              repliesCount: 0
            },
            ...c.forumPosts
          ]
        };
      }
      return c;
    })
  })),

  addNewCourse: (courseData) => set((state) => ({
    courses: [
      {
        ...courseData,
        id: `CRS-${Math.floor(200 + Math.random() * 800)}`,
        enrolledStudents: 1,
        completionRate: 0,
        assignments: [],
        forumPosts: []
      },
      ...state.courses
    ]
  })),

  generateAiCourseThumbnail: async (title) => {
    const stockThumbnails = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(stockThumbnails[Math.floor(Math.random() * stockThumbnails.length)]);
      }, 1000);
    });
  }
}));

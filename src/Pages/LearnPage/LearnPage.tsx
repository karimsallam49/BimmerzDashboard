import { Card, Row, Col, Badge, Button } from 'react-bootstrap'

interface Course {
  id: string
  title: string
  description: string
  category: 'basics' | 'advanced' | 'marketing' | 'operations'
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  status: 'completed' | 'in-progress' | 'not-started'
  progress: number
  instructor: string
  rating: number
  students: number
  image: string
}

interface Resource {
  id: string
  title: string
  type: 'video' | 'article' | 'guide' | 'webinar'
  category: string
  duration: string
  views: number
  featured: boolean
}

export const LearnPage = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Supplier Dashboard Basics',
      description: 'Learn the fundamentals of using the supplier dashboard effectively',
      category: 'basics',
      duration: '2 hours',
      level: 'beginner',
      status: 'completed',
      progress: 100,
      instructor: 'John Smith',
      rating: 4.8,
      students: 234,
      image: '📚'
    },
    {
      id: '2',
      title: 'Advanced Inventory Management',
      description: 'Master inventory optimization and stock management techniques',
      category: 'advanced',
      duration: '4 hours',
      level: 'advanced',
      status: 'in-progress',
      progress: 65,
      instructor: 'Sarah Johnson',
      rating: 4.6,
      students: 156,
      image: '📦'
    },
    {
      id: '3',
      title: 'Digital Marketing for Suppliers',
      description: 'Promote your products effectively online and increase sales',
      category: 'marketing',
      duration: '3 hours',
      level: 'intermediate',
      status: 'not-started',
      progress: 0,
      instructor: 'Mike Davis',
      rating: 4.5,
      students: 89,
      image: '📱'
    },
    {
      id: '4',
      title: 'Order Processing Best Practices',
      description: 'Streamline your order fulfillment process for better efficiency',
      category: 'operations',
      duration: '2.5 hours',
      level: 'intermediate',
      status: 'not-started',
      progress: 0,
      instructor: 'Emily Brown',
      rating: 4.7,
      students: 123,
      image: '🚚'
    }
  ]

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Getting Started Guide',
      type: 'guide',
      category: 'Onboarding',
      duration: '15 min read',
      views: 1250,
      featured: true
    },
    {
      id: '2',
      title: 'Product Photography Tips',
      type: 'video',
      category: 'Marketing',
      duration: '12 min',
      views: 890,
      featured: true
    },
    {
      id: '3',
      title: 'Pricing Strategy Webinar',
      type: 'webinar',
      category: 'Strategy',
      duration: '45 min',
      views: 456,
      featured: false
    },
    {
      id: '4',
      title: 'Customer Service Excellence',
      type: 'article',
      category: 'Operations',
      duration: '8 min read',
      views: 678,
      featured: false
    }
  ]

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'basics': return <Badge bg="primary">Basics</Badge>
      case 'advanced': return <Badge bg="success">Advanced</Badge>
      case 'marketing': return <Badge bg="info">Marketing</Badge>
      case 'operations': return <Badge bg="warning">Operations</Badge>
      default: return <Badge bg="secondary">{category}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge bg="success">Completed</Badge>
      case 'in-progress': return <Badge bg="warning">In Progress</Badge>
      case 'not-started': return <Badge bg="secondary">Not Started</Badge>
      default: return <Badge bg="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'video': return <Badge bg="danger">Video</Badge>
      case 'article': return <Badge bg="info">Article</Badge>
      case 'guide': return <Badge bg="success">Guide</Badge>
      case 'webinar': return <Badge bg="warning">Webinar</Badge>
      default: return <Badge bg="secondary">{type}</Badge>
    }
  }

  const completedCourses = courses.filter(course => course.status === 'completed')
  const inProgressCourses = courses.filter(course => course.status === 'in-progress')

  return (
    <div className="learn-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Learning Center</h2>
        <Button variant="primary">
          <i className="bi bi-plus-circle me-2"></i>
          Browse All Courses
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{completedCourses.length}</h3>
              <p className="mb-0">Completed Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{inProgressCourses.length}</h3>
              <p className="mb-0">In Progress</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{courses.reduce((sum, course) => sum + course.progress, 0) / courses.length}%</h3>
              <p className="mb-0">Average Progress</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{courses.reduce((sum, course) => sum + course.students, 0)}</h3>
              <p className="mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* My Courses */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">My Courses</h5>
          <Row>
            {courses.map(course => (
              <Col md={6} className="mb-3" key={course.id}>
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex align-items-start mb-3">
                      <span className="fs-2 me-3">{course.image}</span>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{course.title}</h6>
                        <p className="text-muted small mb-2">{course.description}</p>
                        <div className="d-flex gap-2 mb-2">
                          {getCategoryBadge(course.category)}
                          {getStatusBadge(course.status)}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Progress</small>
                        <small className="text-muted">{course.progress}%</small>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>{course.duration}
                        </small>
                        <small className="text-muted ms-3">
                          <i className="bi bi-person me-1"></i>{course.instructor}
                        </small>
                      </div>
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-star text-warning"></i> {course.rating}
                        </small>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        {course.status === 'completed' ? 'Review Course' : 
                         course.status === 'in-progress' ? 'Continue Learning' : 'Start Course'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Learning Resources */}
      <Card>
        <Card.Body>
          <h5 className="mb-3">Learning Resources</h5>
          <Row>
            {resources.map(resource => (
              <Col md={6} className="mb-3" key={resource.id}>
                <Card className={`h-100 ${resource.featured ? 'border-primary border-2' : ''}`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0">{resource.title}</h6>
                      {resource.featured && (
                        <Badge bg="warning">
                          <i className="bi bi-star me-1"></i>Featured
                        </Badge>
                      )}
                    </div>
                    <div className="d-flex gap-2 mb-2">
                      {getTypeBadge(resource.type)}
                      <Badge bg="outline-secondary">{resource.category}</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>{resource.duration}
                        </small>
                      </div>
                      <div>
                        <small className="text-muted">
                          <i className="bi bi-eye me-1"></i>{resource.views} views
                        </small>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        <i className="bi bi-play-circle me-2"></i>
                        {resource.type === 'video' ? 'Watch Now' : 
                         resource.type === 'article' ? 'Read Now' :
                         resource.type === 'guide' ? 'View Guide' : 'Join Webinar'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

pipeline {
  agent any
  stages {
    stage('Clone repository') {
      steps {
        checkout scm
      }
    }

    stage('Build Image') {
      steps {
        script {
          app = docker.build("${IMAGE_NAME}")
        }

      }
    }

    stage('Push Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', "${REGISTRY_CREDS}") {
            // Tags the image with the build number and "latest"
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
          }
        }

      }
    }

  }
  environment {
    IMAGE_NAME = 'TaseZmaj/admin-dashboard-app'
    REGISTRY_CREDS = 'dockerhub'
  }
  post {
    success {
      echo "Successfully built and pushed ${IMAGE_NAME}!"
    }

    failure {
      echo 'Pipeline failed. Check the logs above.'
    }

    always {
      sh "docker rmi ${IMAGE_NAME}:latest || true"
    }

  }
}
// I used this repo for testing Jenkins pipelines - hence why this file is here. 
// It can be deleted if not needed later.

pipeline {
    agent any

    environment {
        // Change this to your Docker Hub username/repo
        IMAGE_NAME = "TaseZmaj/admin-dashboard-app"
        // Replace 'dockerhub' with your actual Jenkins Credentials ID
        REGISTRY_CREDS = 'dockerhub'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    // We use the script block to interact with the Docker plugin
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

    post {
        success {
            echo "Successfully built and pushed ${IMAGE_NAME}!"
        }
        failure {
            echo "Pipeline failed. Check the logs above."
        }
        always {
            // Optional: Removes the local image after pushing to save disk space
            sh "docker rmi ${IMAGE_NAME}:latest || true"
        }
    }
}
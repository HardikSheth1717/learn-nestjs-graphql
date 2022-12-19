pipeline {
  environment {
    registry = "hs1717/semaphore-api:${env.BUILD_ID}"
    registryCredential = 'docker-credentials'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Build') {
      steps {
        script {
          dockerImage = docker.build(registry)
        }
      }
    }
    stage('Deploy') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
            dockerImage.push() 
          }
        }
      }
    }
    stage('Cleaning') {
      steps {
        sh "docker rmi ${registry}"
      }
    }
  }
}

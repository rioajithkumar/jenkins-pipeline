pipeline {

    agent any

    options {
        timestamps()
        disableConcurrentBuilds()

        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        )

        timeout(
            time: 30,
            unit: 'MINUTES'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                echo '======================================'
                echo 'CHECKOUT SOURCE CODE'
                echo '======================================'

                checkout scm
            }
        }

        stage('Install Admin Backend') {
            steps {
                echo 'Installing Admin Backend dependencies...'

                dir('admin-backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install User Backend') {
            steps {
                echo 'Installing User Backend dependencies...'

                dir('user-backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install User Frontend') {
            steps {
                echo 'Installing User Frontend dependencies...'

                dir('user-frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build User Frontend') {
            steps {
                echo 'Building User Frontend...'

                dir('user-frontend') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {

        success {
            echo '======================================'
            echo 'PIPELINE SUCCESSFUL'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'PIPELINE FAILED'
            echo '======================================'
        }

        always {
            echo 'Cleaning Jenkins workspace...'
            cleanWs()
        }
    }
}

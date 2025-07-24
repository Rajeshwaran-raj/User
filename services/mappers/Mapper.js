
class Mapper {
  static createDeploymentdbModel(deployment) {
    return {
      user_id: deployment.userId,
      environment_id: deployment.envId,
      name: deployment.name,
      type: deployment.type,
      provider: deployment.provider,
      repo_url: deployment.repoUrl,
      branch_name: deployment.branchName,
      zip_file_name: deployment.zipFileName,
      replicas: deployment.replicas,
      instance_type: deployment.instanceType,
      build_command: deployment.buildCommand,
      start_command: deployment.startCommand,
      health_endpoint: deployment.healthEndpoint,
      storage: deployment.storage,
      ephemeral_storage: deployment.ephemeralStorage,
      created_by: deployment.createdBy,
    };
  }
}

module.exports = Mapper;
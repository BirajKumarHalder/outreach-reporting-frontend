export const environment = {
  production: true,
  useMock: false,
  logEnabled: false
};
export const serviceUrl = {
  fetchRoleServiceUrl: "http://172.18.4.9:9079/uaa/api/fetch-roles",
  authServiceUrl: "http://172.18.4.9:9079/uaa/oauth/token",
  participationMatrixServiceUrl: "http://172.18.4.9:9079/event/api/fetch-participation-metrics",
  engagementRetentionMatrixServiceUrl: "http://172.18.4.9:9079/event/api/fetch-engagement-retention-metrics",
  eventInfoUploadServiceUrl: "",
  eventSummaryUploadServiceUrl: "",
  addUserServiceUrl: "http://172.18.4.9:9079/event/api/add-associate"
}

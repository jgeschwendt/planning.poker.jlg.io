/* eslint-disable @typescript-eslint/naming-convention -- **/
const log = (...info: unknown[]): void => {
  const logLevel = (window as unknown as { APPLICATION_LOGGING: boolean | string }).APPLICATION_LOGGING;
  if ([true, 'debug'].includes(logLevel)) {
    window.console.log(...info);
  }
};

log.error = (...info: unknown[]): void => {
  const logLevel = (window as unknown as { APPLICATION_LOGGING: boolean | string }).APPLICATION_LOGGING;
  if ([true, 'debug', 'error', 'info'].includes(logLevel)) {
    window.console.log(...info);
  }
};

log.info = (...info: unknown[]): void => {
  const logLevel = (window as unknown as { APPLICATION_LOGGING: boolean | string }).APPLICATION_LOGGING;
  if ([true, 'debug', 'info'].includes(logLevel)) {
    window.console.log(...info);
  }
};

log.notify = (...info: unknown[]): void => {
  // eslint-disable-next-line no-alert -- todo
  window.alert(info);
};

/* eslint-enable @typescript-eslint/naming-convention -- **/
export {
  log,
};

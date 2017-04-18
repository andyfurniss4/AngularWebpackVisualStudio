using System;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Utilities
{
    public static class AsyncHelpers
    {
        public static void RunSync(Func<Task> task)
        {
            Exception exception = null;

            Task.Run(async () =>
            {
                try
                {
                    await task();
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
            })
                .Wait();

            if (exception != null)
                throwException(exception);
        }

        public static T RunSync<T>(Func<Task<T>> task)
        {
            T result = default(T);
            Exception exception = null;

            Task.Run(async () =>
            {
                try
                {
                    result = await task();
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
            })
                .Wait();

            if (exception != null)
                throwException(exception);

            return result;
        }

        private static void throwException(Exception exception)
        {
            if (exception is AggregateException)
            {
                ExceptionDispatchInfo.Capture(((AggregateException)exception).Flatten().InnerException).Throw();
            }
            else
            {
                ExceptionDispatchInfo.Capture(exception).Throw();
            }
        }
    }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Function to track page views (though @next/third-parties handles this for route changes)
export const pageview = (url: string) => {
  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

// Function to track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

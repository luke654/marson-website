import { ReactNode } from "react";

export function ReviewsWidget() {
  return (
    <section className="py-16 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cosa dicono i nostri clienti</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La soddisfazione di chi ha venduto o comprato casa con noi è la nostra migliore garanzia.
          </p>
        </div>
        <iframe
          className="lc_reviews_widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/ex5ANvHlbpBQcbqlNsx5?widgetId=69e398ebd30412007a2e9480"
          frameBorder="0"
          scrolling="no"
          style={{ minWidth: "100%", width: "100%" }}
          title="Recensioni Clienti"
        ></iframe>
      </div>
    </section>
  );
}

import { Route, Switch } from "wouter";

// Pages
import Home from "@/pages/Home";
import DashboardPage from "@/pages/DashboardPage";
import ScannerPage from "@/pages/Scanner";
import StoresPage from "@/pages/Stores";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/scanner" component={ScannerPage} />
      <Route path="/stores" component={StoresPage} />

      {/* Catch-all fallback route */}
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-muted-foreground">Looks like you wandered off the thrift trail!</p>
            <a
              href="/"
              className="text-primary font-medium underline hover:text-primary/80 transition"
            >
              Go Home
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

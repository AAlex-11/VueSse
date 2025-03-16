import { Observable } from 'rxjs';

export class SseService {
    constructor() {
        this.eventSource = null;
    }

    // Connect to the SSE endpoint
    connect(url) {
        this.eventSource = new EventSource(url);

        return new Observable((observer) => {
            // Handle incoming messages
            this.eventSource.onmessage = (event) => {
                observer.next(event);
            };

            // Handle errors
            this.eventSource.onerror = (error) => {
                observer.error(error);
            };
        });
    }

    // Disconnect from the SSE endpoint
    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
}
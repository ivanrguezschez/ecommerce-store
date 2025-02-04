import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { SpinnerService } from "@api/spinner.service";
import { finalize } from "rxjs";

export const SpinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const spinnerService = inject(SpinnerService);
    spinnerService.show();

    return next(req).pipe(finalize(() => spinnerService.hide()));
};
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export abstract class AbstractDataProviderService implements CanActivate, CanActivateChild {

  private isProviding: boolean = false;
  private isInit: boolean = false;

  protected initialized: ReplaySubject<any> = new ReplaySubject<any>(1);

  public initialisation(): Observable<any> {
    return this.initialized.asObservable();
  }

  protected abstract init(): void;

  protected abstract destroy(): void;

  protected reset() {
    if (this.initialized) {
      this.initialized.complete();
    }

    this.initialized = new ReplaySubject<any>(1);
  };

  protected startDataProviding(): void {
    this.isProviding = true;
  }

  public isDataInit(): boolean {
    return this.isInit;
  }

  public isProvidingData(): boolean {
    return this.isProviding;
  }

  public hasNotStartedProvidingData(): boolean {
    return !this.isProvidingData() && !this.isDataInit();
  }

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> {
    return new Observable(observer => {
      if (!this.isDataInit()) {
        if (this.hasNotStartedProvidingData()) {
          this.startDataProviding();
          this.init();
        }

        this.initialisation().subscribe(
          () => observer.next(true),
          err => observer.next(false),
          () => observer.complete()
        );
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isDataInit()) {
      this.destroy();
      this.resetDataIsInit();
      this.reset();
    }
    return true;
  }

  protected setDataIsInit(): void {
    this.isInit = true;
    this.initialized.next(true);
  }

  protected resetDataIsInit() {
    this.isInit = false;
    this.isProviding = false;
    this.initialized.complete();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from '../core.index';
import { apiResultFormat, sideBar } from '../models/models';
import { SimpleRecord } from '../models/simple-record';
import { APP_CONSTANT } from '../constants/app-constant';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public sideBar: sideBar[] = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Billing',
          route: routes.billing,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-file-invoice',
          base: [routes.billing, routes.billingAppointment, routes.billingOpd, routes.billingIpd, routes.billingPathology, routes.billingRadiology],
          subMenus: [],
        },
        {
          menuValue: 'Appointment',
          route: routes.appointment,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fa fa-calendar-check-o',
          base: [routes.appointment],
          subMenus: [],
        },
        {
          menuValue: 'OPD - Out Patient',
          route: routes.opd,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fa fa-stethoscope',
          base: [routes.opd],
          subMenus: [],
        },
        {
          menuValue: 'IPD - In Patient',
          route: routes.ipd,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-procedures',
          base: [routes.ipd],
          subMenus: [],
        },
        {
          menuValue: 'Front-Office',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'far fa-hospital',
          base: [routes.frontOffice, routes.visitor, routes.phoneCallLog, routes.postal, routes.complain],
          subMenus: [
            {
              menuValue: 'Visitor',
              route: routes.visitor,
              base: [routes.visitor],
              icon: 'fas fa-user-check'
            },
            {
              menuValue: 'Phone Call Logs',
              route: routes.phoneCallLog,
              base: [routes.phoneCallLog],
              icon: 'fas fa-phone'
            },
            {
              menuValue: 'Postal',
              route: routes.postal,
              base: [routes.postal],
              icon: 'fas fa-envelope'
            },
            {
              menuValue: 'Complain',
              route: routes.complain,
              base: [routes.complain],
              icon: 'fas fa-clipboard-list'
            }
          ],
        },
        {
          menuValue: 'Pharmacy',
          route: routes.pharmacy,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-mortar-pestle',
          base: [routes.pharmacy, routes.pharmacyMedicine],
          subMenus: [],
        },
        {
          menuValue: 'Pathology',
          route: routes.pathology,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-flask',
          base: [routes.pathology, routes.pathologyTest],
          subMenus: [],
        },
        {
          menuValue: 'Radiology',
          route: routes.radiology,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-microscope',
          base: [routes.radiology, routes.radiologyTest],
          subMenus: [],
        },
        {
          menuValue: 'Human Resource',
          route: routes.staff,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fas fa-sitemap',
          base: [routes.staff],
          subMenus: [],
        },
        {
          menuValue: 'Patient',
          route: routes.patient,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fa fa-wheelchair',
          base: [routes.patient],
          subMenus: [],
        },
        {
          menuValue: 'Setup',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'fas fa-cogs',
          base: [routes.setup, routes.settings, routes.charges, routes.bed, routes.frontOfficeSetup, routes.OperationSetup,
             routes.PharmacySetup, routes.PathologySetup, routes.RadiologySetup, routes.SymptomsSetup, routes.FindingsSetup,
             routes.HumanResourceSetup, routes.VitalSetup, routes.AppointmentSetup
          ],
          subMenus: [
            {
              menuValue: 'Settings',
              route: routes.settings,
              base: [routes.settings],
              icon: 'fa fa-gear'
            },
            {
              menuValue: 'Hospital Charges',
              route: routes.charges,
              base: [routes.charges],
              icon: 'fas fa-donate'
            },
            {
              menuValue: 'Bed',
              route: routes.bed,
              base: [routes.bed],
              icon: 'fa-procedures fas'
            },
            {
              menuValue: 'Front Office',
              route: routes.frontOfficeSetup,
              base: [routes.frontOfficeSetup],
              icon: 'far fa-hospital'
            },
            {
              menuValue: 'Operation',
              route: routes.OperationSetup,
              base: [routes.OperationSetup],
              icon: 'fas fa-cut'
            },
            {
              menuValue: 'Pharmacy',
              route: routes.PharmacySetup,
              base: [routes.PharmacySetup],
              icon: 'fa-mortar-pestle fas'
            },
            {
              menuValue: 'Pathology',
              route: routes.PathologySetup,
              base: [routes.PathologySetup],
              icon: 'fas fa-flask'
            },
            {
              menuValue: 'Radiology',
              route: routes.RadiologySetup,
              base: [routes.RadiologySetup],
              icon: 'fas fa-microscope'
            },
            {
              menuValue: 'Symptoms',
              route: routes.SymptomsSetup,
              base: [routes.SymptomsSetup],
              icon: 'fa fa-cart-plus'
            },
            {
              menuValue: 'Findings',
              route: routes.FindingsSetup,
              base: [routes.FindingsSetup],
              icon: 'fa fa-binoculars'
            },
            {
              menuValue: 'Vital',
              route: routes.VitalSetup,
              base: [routes.VitalSetup],
              icon: 'fas fa-heartbeat'
            },
            {
              menuValue: 'Human Resource',
              route: routes.HumanResourceSetup,
              base: [routes.HumanResourceSetup],
              icon: 'fas fa-sitemap'
            },
            {
              menuValue: 'Appointment',
              route: routes.AppointmentSetup,
              base: [routes.AppointmentSetup],
              icon: 'fa fa-calendar-check-o'
            },
          ],
        },
      ],
    },
  ];

  defaultImageBase64: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaEAAAE/CAYAAADvxHzxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAEnLSURBVHhe7Z2JdtvKkmUhDhrsW1296v9/7b1Vf/D6XlsSKQ7q2CcyQJCSbFmiJuJsEASQGDhkZJyckDj717//974z5gSQId8PzPmMV7wF97k3dseS1bbvbHLWTc4m3dmZAnJHcH+/1bE6XMutzsurwG7tIXGNOGcb5+jz49q6vJZ8Vq2ftWu3L8R7LvZg93q90jrnT+I763xdW8F76HJtRb97+FV1vM405lNgETJfm/KmzYrToQ8YeFsJDQ44FuXAdyLQddttCMcmxIf1zSa2t90mZpa1zb71ahUCc/A5B/BZE4Si5kmIx8FS3wYRjJkvw3JCeBOaXGdffs84S9853+Lz48X3KMFETCfTSf97tBx+zbxUXseYT4JFyHxpKqePEctfa4U9O3C6OOfckaIjgQnB2WzWMYfAxPo6luv1RvvvQ5B0HA4ecUKACNcHPAN9pzy2xKOcfwkLTKZn3TS+W4pWigji08+UnEKQzs/PU5TatfItr6/v1b5WhoZg8RmEtWPZHApaO9WYD8ciZL40JQzpnNPZyumyj9XytvdnEhTEZL1e780SIZV22J/Xq9PqQn1YbPdi8EsQsLqO3iQUuk7bYE3iwLV46funGCE82mZChOaIEKWjaTedxTyNmfUmWpSs9F/E7+BaSa7ovYXxHfR92tcw5qOxCJkvjRw5K3LgWok5nDF+tokOJZnl3Upis4mSTi8+2yj1tBIPkxx+XqT30c137/HcBFPXglrrv28jhSqEI0L5DmLwARVWAoXwzGaz3TyPeTpLUUKQomTFtfQZvHF5Jn6jZq7VH2HMh2MRMl+acs65QbtOlmjWm/2SznK5aiWdJkwD4dGL67ASsxIE3loQls67qI/7FRzP59R3y0V+11rX+1kcOLge34svoGWG6PtQOhpSv7s6VnCNi4uL7tvVpcKzdFT78pfpF/NxsZEhxnw8FiHztWkOFQdLVRptPKvVKkTnrru7W8Z8JxE6O5um482XHHtPvxFH4KF7cj2DduElYL+inan3pJ3Rv+W++NZ63xOFWO3Pb8H6XnFatVFJpNgtgWnfOwSNBSWj+XyudqT5+bybz+aqwkOYOGlLCTBPN+bDsQiZd6d6lslv4kRZATnZ5mBjYy/3347tiUPSreNU77u75TKEJ0QnBGijqraqistSDz3OyuvuOfxgJyiHe4YM99TxL2P/7IfXyk86+CZstkP1fYen7X21tiP+K3rhITyqqmvVd7k9ifWs1uM/5nosESpOR8j576j6M+atsQiZ96ec5sDydkKA/1TeXsdJkPKVpymshUfo3TJLPavVXbdspR724VRLtPLY5/Inx76E/E5/Tv8P/BZ+r+b2W/gfJD4hKlTR0QZ1eXXV/dd//dVdnF9I+BEe/euxX/9bnPpn/5sxL2OQ1TTmnSjfhrMbCAXVTHv7WDDFevOL2d4TpZ3F4ra7vr7pfvz82f2M+fZ2EeFrXaPOiUXAWXXR58BJbzm/lGeeG4fp/1JPutbFOyb+F9rHVncr/RuUkmAo/rs1LtJWjXljLELm3aFXGtU9uL10mO2emJhxfilIOULBDhzptluFI71dLEJ4rrt//v5bYlQdDeQ7m/OVE40gtROxf/9iJwm/Ue1F7bf2Yhzw//A/8d9fRSnoUh0YJq2zBm1mdb9ShHFclCiNeQ8sQubdqbYejVAgAcleZCVEEiZtz8KdnoXwbLrF7TJKPrcSH0pAiyj5LJZ34URLyAbnU+UUSMzaPAZKaLJEORCjg/9HbWYhMtx3RBfv6TT+5zh0FSVJ9sXhakcy5j1wm5B5d7IBnOohSkSRC48Jp8doAThMfCdGye0z9HCjqu02SjxUJfU59DiM8+RoBxZcDrf2lQClLOX7qVK/d++3tv+p1mGzXqnX3Pfv36NU9K2bhxDpfxftaN4G/6sxb4VFyLw7ODwcJiUhPF3l0HF6iAxVbtl+EXM4TLpc095DVRJUpwPEhiq66m1XyI3y6h1rcPJWHj+Q/yQmhIip/836O2Jq/8dmS9tZlD4pCc1m3eXlZfft2/fu8uIiMgJkELJnYZVYjXlLLELm3enFBPHB0YVzxOnR4YBu1kvd34P4xHHyrek8JTxtPavxqIqL8HCm6XPT8WoZ4Hh5iQw6YVq1ZPyfJUJVCgT9Fw3dm1T7Iph4oCTKfUUI0uXFpUqrp/+fmc+ARci8D/jAsDSMTW1ABITTZJ1Sj8SH+3zoZk01HU7yPtslSnxqloNt7UmxGSLE5TNcDC2a/ewbOOSTpv3PWsKDn61/L/833gL+x/wvz9Rlm04LdF5gBIaekfx95v2xCJnj0RxfOfxycsqZx5yOL6vecHo0hCM8i9tbLamGy+OyjWg6OQ8xoqE9Sz3D6w4dKDl7hfEF9Mp9MPwOp45EuP1M/ez223v6vyCFKP4UHXNwlMIuolT0f/77vzMeaK+jurShOGJF1+8vqtXcqrBHrm3MARYhczzkcXYlFEZ8Btp5qhvwbDaP7ftuubjrbm6zlxslIagOBYCTfL4Lw4Tt7v6MYbJ/+N/l/9/ppta/vv+lajq6cKNb9bA+VYNypAQ+Zr2G1+XKjhfzayxC5mhUaaXaaMpZkZMmTJ0O7lbqYk2bTw0uWucwsY6IAU7P4vIxVCaAHos8RgIRuri8aI+UyHYnxVMbr25PexRlB/EWxxvzGO7+Yo5H+J268fSwVIPYLBaL7u9//tEIB6wjQiVA6vHGOeHRctap5oNQ3MWL9rnb29vux88f3fXP626xjHjbZLwpemPBek1JxvwuCi1A5mksQuZoZHtP6wQQL43cHKUgulf//PGz+/vvf7qbm2sJUp7AOTis1qkAXxVh+XRRqvJ2bsx8AE076DxCN/mbm5vux48f3U2UZMlAkNnIJ9buSCEqSYqJNj2XgswvsAiZ4xL+RkPBhPMB2oIo9fy8pvRzK4eEMMmBUfoJnZGz2jK8TquaY3JR6ENpEpKl1IgvKCEiLrl5WGP1EZ+UfBWXGWeEadbIDQoy5kksQuZ4hONR1+pwRiwY3VrD7ITjoiccjopn2+wLjFQoXV5zXOoRxwXMx0JUtgxB3s+VvRHpRo8Y/fPjn+4u4pi4IkpVquU4TiUu8wIH8W3MPhYhczxwVnr89DzEpOuuf4aj+vtHOKxbOTTGKMPkSmgIlIOLnDSPGdg9aiCdmPl4EJ3sgMDD8vIZRAgT4vPjnx+RwbjeG06pSkVFChNK1AKMOcAiZI5LaAdOieoa5rtV5JSplmFXCEuNloAj6z1TW+07KNhpfS5apoBYLFGpuKTTwvX1te7zyl6NrVS0F4GOTPM0FiFzHMLP4JgYcueff/6JEtA/ajMg58xgmeSOq3Sj3HLrwIAjowcWOWmcWB2z78TMe8P/r0xBiytQu12LJ8IZXYEOCrQRIUIqDUmwWMQUK4rPFqfGPIZFyDyLqt9nxqXIr4SwZKP1JEo/G7X//P3//tZNqHTjBeWcdWLCuq6l8/Vqy7yw9plPQ8VHxWDFJeGaJEzbvv2PEc85hipZqmZV60rRyJgnsAiZZ7JzJHJEzbGkA1qF8+F5PzexvFGOuK9WU24YT7RzYJUzZpsSUh17KFjmgyGaVJJho8VPmwlXyUdxNolS76a7veGRGwvZRMZrZFB0bLuWMY9gETLPovmdXJ+cqRPBNpyQuuz+/Kkl1WrplIZCwvpwGw63zeflqbjKeJYgxQtBomqV6rnlcqHu3EC13eGjNowZYhEyz0IZ4tZ1GufD8i4cze3Nrarfqk1gX4DMaXOfpdiYaCci/umUctMGpMVG1LUb22lnGHOIRcj8FhxIVqmlwJDjpQMCN6Hy5FMeCa0GaDM6KAhVvgMxQoiWi7QN2gWz+q4/xJgHWITMM6GnVLoS3ayo9p/bcDQbVbn0j+Z2nndUKLbjTWJDj8eYqIpDiLiXqHrSWYXMU1iEzG9BWxjRmqoVnApVLQgQTgYHJBGSAJlxEXHeSsAIkIQoJm5ElhCFnfB4dhmQMU9gETLPAqGhGg7hkXMJJ6P2oeZg8EVZJWeHMyYqymUHqUd7mRW1DcW6MU9hETLPAmeD8FACkmOJ3C7CtBOh5oHMyIh4b1GP8FAdx/OjgNEyqJajy3YdY8whFiEjhj6C9X4bjYkNGpwpBS1CgOiGq/tAGMafDHATINe6jJGI9GYjNXJ6ZU4QJarj9NwoDmj2wbosBttRiBkzFqGx0xyBhAQViTm7YodD0WbW8S9oaL4LZxLB3ISoxuYAR8PjGu47ZruUUdJMRyWgWK/RMtgm88Jo2yy1P47DZjgQ2yo7kw3q3YwNi5DBB6T+tPUCJ8HE0CxUxZGj1WMW2iTaIo8cnm3GxSD2sQnZU95PhgCl8NRRthOzwyI0cuQUBj6hxCXbeuhym9Usq7u7rFZpI2JrR1vVJRAsnWPGRGVIcmpgBrGhEjUlZR5yGEsEiWPSSmwrJrEIjR35gnQIchHNkyBO0hTlZLcaHYFqFhxJCdfA7aQA6TK7MDMCiO42K/oD2UdADe+WAU4ZKT1KQ30GxnZiBliExs6BL+g3m0ehFIQD6Z1IhFc1XTFcN+MF2xmWhsmkYD+UglQlF+vs3YmUhchYhEZPlmbqfh/mdAzlKKhKUTUcDiOC+hJP7k5q3T5l3ET896XjgX08aBciEzMQK9jfMmPCImQeIVxCvHAeVMHRKQHfUs5DAlW+pm1zbOZs7U7GBFqCDSA+iv9mAmkVzRYiLEUoVghi5lCO1aZOMCPFImQO6F2HnArOY83oCPIuBBK+VdWKgsqpmHEiFWrrQWZECA470q7cT4k6VYeQwQlm9FiERk6VYPAPuAa5h+Yj8qmZ+ZwYCU7MHMvzYXSOAtOtQG2bcZICNLABCVGKDpkW7GNoX21hRo5FaOTgJEDdaXEgsZlugxX2hQPZPBSX3oHErpSjh8eYEUC0V9TLKOKt2YTC04RUFcezhvKpqxEQs4RJwmXGjEVo5DR/kCUbOQQCtCcCuVGVHnIRruNCmmLOx3Hnw8yEdjfhMqOEuE+72NkElF0gQosl95ptZDs8FqQ6KsjqZF/aNCPDIjRySnx65xHgNKiG48F1DEJpzKvBzkKIdNMqHRQCZWo0mTFjERo5vQgNXUGs0itucbvQoKV2E+Y1UDVHabpuWlXJOmyqLzlhXq3kZMaHRWjkZBVc+AE9NbWJTQStViFCenx3lITkJ9o+Y14Adqaelow/GEuQzbUSuDVovFiEjHKjmStlK3OsdMumKo71YVWdMS8iVKZufEaMCFB1HKYlBbIMjRWL0MhJR0CONNfJseIouEFV93YECJQxryLsi/YgqnklQqE5lbmx/Iwbe5eR0zuC5gkQIbrS8jAy6vLruUGJ3YX5c7AwqnPpko0AbUKMsl2osF2NGYuQEXq4WEBudXl3p5IQjmM6mUqMkhQsY/6MLG2TwcG+9BDEZm+wp0dmdFiERk5fEtpmLzlVmUQpSFUmsUuP8LaTMK8EO2PCxsrWao63XJpRYhEaOdxESPqn2o3l9fVtt7pbd9PpLMKm3WbNHe5lJnYU5mVQFZc2lm2OZHYqA0Qvuf1qXzMmHPNjp3Ql/AFVJOsVDqL1XGo5V+005oVENiftrJnR4XA9JUZmnFiExk6kf5wAToFxvVim08BJxGwHYY6FzCpL3hIhTGwvvALMmLAIjRxKO4ADqGoSvET5iNpvzOtJoVGnBNlXig5LC9B4sQiZoJWEECGqSiJETiFeVUoy5qXsZWMwK80lSLatsWMRGjtUx8WCEhD3BqnBWCHpHLK+3o7CvIY0MqwoMzcq++SuARakcWIRMnIIdEagOk4jHDeHUbAvQZCM+XOGnQ8kQc2kXN1rLEIjZ1ctknez4yB2joFecu2YFmLMS8CmeruSMZUKRWgTqKFQmfFgETICodFYceEbDp1BVpNYhswrwKR6DUpbkiwpbCdEZnxYhEaOEn/4BHXPVkA6iXQJdEpgaQEyryRMSCUhXmFzNVdJHCxE48QiNGJI+oyMQJPPcskTVHETZ230bO5ix1FklZwxr0FCE3bEyAiMxMGYhBpBIYyPseRSlOyOxohj3SQoUmZIjTkqlKyrtAPK05CzqbmxWzNjwiI0dsI3VJXIYbWInEdMAz9hzKtJK8sq37Stnb2Z8WERGjEkfZJ9L0KHTqDftAqZtyGr4coGW6AZFRahsdMEqAaVlBA1zdG6HYM5NtjZttlaQDtkYmMbIxahkUOyl0NoM/ROITZ3jsKY11F2pSesbje7m6DL3FwUGiUWobFzUBIqEB8mHEe2EVmGzBEIE0N8GB5q93RVj084ZixCI4ekr2o45oHoMLHTzsG8lrQprcie6JLN6BzcCpD2xexMzlixCJmktMa+wLwJaVh9hqcyOGV3uxUzMixCo2dXFTfhZsHmHFQampzFZgRYmMyLSXHhRtTtJmyMx3jfn3V3y7tsE1IRSUe02YwNi9DYaaJTwiPRibmvkjPmCEiEQnSyfbHrVnp2FdvaNCPGImQewZ7BHJssEYXutIxOZn6MsQgZY94c9KZKQa2w3Y/aXmLkkvc4sQgZY96BFJrdMp/m2+vOLtiMDIuQMeYNSZWpNke2qY5jmxtWjbEIGWPenMPqOIRou2kiRCko9cmMEIuQMeZNQWOqM0KuSYWyOq6F8LIKjROLkHmEchjGHANEZtAdW5rDyAlpZ5SSbHHjxSJkIv8Z3kEOIhxFCzHmmCAyiI3AvBAe3SQdm725WYrGiEVo5KgqJJwA9fWZMw1JivV0ENmYnKNr20GYl0Emh8d5Z1dsHhs/kd1xw+pms9ZIHQhRddU248IiZASOQoLUqLVdKanPrhrzB6Ql7Uo7zaYCiQ67bVqjxiI0cnAI5RR2grNP7Tfmz0nb2WVvdtiqDFiExg6eYDgbY8w7YhEaOSoHnem9hRhjzPthERo7oT0SIGuQMeYDsAiNnL4k5NKQMeYDsAiNHXSntOcpDbI2GWPeCIvQ6Pl9CcgaZF5O66Kt930e6zFnxodFaOToXo2zdjPhlqFUcjwvhIn7hnIy5qWk/NQQPdwvJJsKu8ubVgMb2KixCI0cRkaYhGeYzWbdNtY3NbIx4BxqNuaFyIRCdJhpeySA9SkiRHhMWR53mXuMWIRMEunfnRPMW4H2MB9iazMWISPxYfyuHMMLb1E7cp8xx0bZnV6ZbGNjxiI0etIZUD9/NmnOgOoS3rSa1SgKNOaYhN1he1hdVsrZxsaIRcgoIyohqpLQI9g9mJeSFjWwK1abzcncBrvM+LAImfABMUUpSCWheA1zpJlPNeZ1ZN5mZ0uyOSYJUQt3TmeUWISMfEO1CQmcQcw4CV7GvAWHwuTquHFiETISG+VGh4LD+nDbmGPSbKs3MevPaLEImSS8wV7ViDFvwFBrMuOT9uZS0HixCI0Mknr2Q4o1fEALozQ0m061BHrLMYPai1q4MX8K9lUjJjAiByNzzGfz7vz8XBqkzpdmtFiEThTS9VBsah4WdKrkMwmRmU4nMc90THbJbuSFjHkhjIbQhW1NZWMZkjZ5pkwONkimZ9pnesy4cKyfLJHUm5ioHNMEpyAMdAw+ge7ZIUZsk1vVGHIWH3MkyOhIbQC70lwrKUQszfiwCJ04Ve/OhMCU6KQPaIJzH4LDYbzFjqoy2Z2vVWNeQBrPZhN2FjM2p9J3lIoo/eT+sMuwN9mmGR0WoRMFQdEoCO0GVKpA+oQ+1JVY4TgGMJ3NZ6o2yRKTztAUJ+WxxrwAbGi9XmtwXCwLG5vP52lvrQpOdqbZjA2L0KkioSmpiSQeQkISVy60Vb1JqGKdxzjgGGbTEKIQo+kMIWojHEu48hrGvBSq46qzS7YPZWYnrTIzQv19amZUONZPlUjbmcARkRQSCjjlBEjwVMMtlsvu+vq6u7m56ZZ3S1XFSbxKv4IsGQ0CjPkDlN0h49PsCLtbrVbdcrHsbm8X3d3yTqWkEiQzLs7+9e//dcyfIBmp1L+Tz4jkTRtP+ABKPZSC5ARCgG6ub7t1OADEabNeR/i61xvES6WlaQjWhofdcVWLkflz7u8RItolaX+8V4mbKrkwO2WI5ufz7uLiQmHWonHhktBIIJeJqJALpX5+sVh0P3/87G5uowQUOdJF5EiXd3c6RtV1MSFc6rRgzCtAU7ArrbU8DJmau7A3SuA/f/7sfoQtUiLC7sy4sAidKIdJmcQtYQlnQGmHapDbECKVcOLgqgqpQUxBwoUQ0V1b2EGYl9LsK0pDWS0XIWFXm/W2W0WmiFI5VcOr9SrNrExtYIvCJnhyWIROlEy0OVd9PAJDKYfusoso/UzOpt2EBuI4CoFSw3CcUl1p6bmkGwxb+jfmJWBfuk8IQ6JEpEVYaCzVIWZGtdw0S+dRKkqhmsRhGF6cFy+VpFhFwLiUORksQicK6bRlOEWfk4TmCH6PrpKrxrwJZH/SxmSWdRsBc5Ca02yQoGfZrflKWIROnKGEpPZkDpQGYrX3KFFbaMwnIAwTmyw77RkIkcIHu8zXxyI0NloC30ZKV5WIU7T5FOxuqG4q9ADZqs315LAInTy/KOU4QZtPgqxUGpNThg2q6tqbTfb0sAidPMNk6yRsvgI74SmLVUi85R5zSliETp5hst2tV1fZymka85FQ+sEeuWl616FmKENYr231FLEInTyDRBxpuMSH7tgk+EzXu2OM+TAG9sncE+ZZVXSxo9msORUsQicKSZb23aLPRbaEXjg9m88CNtoLUNnongDtgs3pYBE6USodbzTawX2OhMBaKBMlIIbRJ1GnUDllm49HdjmbyUZTbHKED621G6mHGStzGliEThZS8S4Rl9CwSVUcj23QduUyjflIsMsQIUZOUDftAIvte8qFKrEue7bJnhQWodFwmHidks0nI1RHJaDMLx2Q9vroLvOlsQidONn+k0m3ZKevcyfAWmQ+CbQJqXdcTJR4Hi2ly3bbujkJLEIny34izlq5rGvXU1UlTsZ8IsIme7tsposgQV+rbE4Oi9CpQqJ9JOGSyPW8ICX2Jw4y5gOQbfa3DTT69dYeZHs9OSxCp0xLwC0vqXe26pEOrDtJm8/CpERIdjm0zKEqmVPDInTiqMQTL3UqijeSs6o4nK7NJ6NKQlVI3xV82MhFVc+Z08EidMLsJ1elZgWS2J2Yzaej2ebOcpvNBtnCKRUyJ4ZF6ITpG3N3aTnXK7E7QZsPYljdVuuZNcIom+BkYL0NluaUsAidKCThEqG6YZXFZrvp7mOezan2iIBeqYx5a3KQUpbckKp80OSs2263CudR85KfsEnJURslARtlnao62bJN9qSwCJ00mbOsNKv0H9t6xQYTL2Peg11+J42u32Ypm8zNMtihabKu7f4a5lSwCJ0s5CRJs6TaTLmSHaXklryH68a8A7JHTK7MrhecnMz4sAidKErnLWtZ1XEElhCxzPuFcpcxb4cq2bSWUpMTlG3qBuo2yK4ZFxahU0XpeZeohwkfdK/QFBGa9A7CmDcjTOwxO6uS0XQ6bfcImbHhWB8RuAC5AdJ9iA/D5k+c+zRvTmR/MLOwuyz5yArjnQBs8Uyjuk8nU4WbcWERGgUlNJHswwkwTSPXOZ+fO+Gbd+Iws5MCBIyUMJ1NVRoy48MidKqQwKu+nfQfM5v391sJEdVx8zkloTCB5gyMeTOaDT7GGRmi2VxCZFscHxahE0UaxPteor7vttssDVEFQs4TB7AjS0nGHJu+TZLMUGxr7jNJaYsulY8Ti9CpM8h94gSo+iiU8KdhAnIM4RBiXzUOpxilkzDmtSA0lcEpQVJYCNF8HqWgsEVb2zixCJ0oSE0l9tITEr0GiGxhrNMgPKyS6x/zENsEaZ2LGfNKGBmh7BCqS/bF+UWK0H3sN6PDIjRyECBVg6A7rapul2PFZzQ1MuYVYEfK/KTu9Og2gRAjhEn7zeiwCI0ccqB01YZt5ESZJTr4AxxDy7Ua81qqhI2NqT0oXvTSVOmcfTa1UWIRGjnTECBECCegUlA1FrfZmKPQMjZlY5piOeX+oMgIZdWcLW6MWITGDDnRVhLKJ61mGA4ChyA50psxrwPB6avbwqZqXfcHTUKEKHUrxIwNi9DIoToER1CNxJDuQGrUl4yMeQ3K2AxUpqrfctSOdEOZ+TFjwyI0crhPqOrkJT68YsYdVLWJMa9BVkRJCBtr9lX2ttc706Y2SixCIweHUN2yq5eSlCgcgkpBdgzmCNDzMmn21RY5iG7eQ+RS9zixCI0c5UcRIOa2DnIKMRlzFNAdbKuJT1pbZYBiRfkd29sYsQiNHsaR67qZ7tfIGwrVVTuWm03M3Dskd2HMQ5RVodr2qVIMghMqQ7WbZCcO2243YWM8Yn4Wm1tdozvjRlWL0BixCI0cOYBAVXEZIGehXnNteP2+55wxj4HhNOMpQepnMjExbzYbbfcl7cjo0BbEMFIZxPEeMWGM2LsYOQFVx8UcrkAOBfGZzXjQWLt/6GAyBsiw1LQD+2iWErZDyVoiFFNmduJYmdC92oQmYWslWmZ8WITGDpoT4qOushq/K5zGpt3RHmxjudmsc5ugWjaGArbnh8woaFLTpgJDSJtAdChJZ6lnkgIU5NEcw75mP2aUWIRGDs4Ax0DVGyUfnIHag7ZUn8hNxFs6lWTfWQz0yIwRDGA4y1zCapqwSICitEP7D1AiImOTN0ljb3FanKdj6aptRodjfeQgOAgRN6wypP4snIN0pjkUnMWcYX10NN4iHUZPBA3zwGbEYBvNUmQS2EYoTHXPXkeJerVeSXguLy67y8urrIrDBnXIwK7MaLAIjZ7MrVIdd35+0c3P85Hfqsdfr7t1zPSSk38Yis+Q5mysReNDpR7sIl+yg+pdWSVqzVECwpawkfP5eXf17SpE6FJVcXW8DWicWIRGjpwI9fYhPOdREiKHenFxoeo5XALdaXEg5HB7h9MTuVxyujXbiYwW7KOt9LYyXGfmEd6XV5cpQGFnlLJBGRjbzmg5+9e//9exP2YGmoIzWK823fLurlsul93qLktByqXqPo50KhIbvfaXD0XKnDopIMFQfIoWxiurdefK4JxfnHfzebY/CpnPNrfvW5gZDRahkVMlmBSQKBiHNSA6K6riVjsRWm9WWaWisE06mDhHAlV+SNewExkTdDKAjPtYiU06IlCqVkknAulwwEC5VPUSzn7uCcL29m0mTrYIjQ6LkHmUnVGwlu1Gi8Wy+89//tPd3t6qIwNVdnerOx2l7re9MzFjITUo7IMRN87uw0YWqmr7n//5v6p6w3x4ZtU2Mi5pScbs4zYh8yg4i5xbDrflWLPrLUfs4BgdbEYHtqDMBwoTM7YgQYqSz66Uox02EfMoFiHze+RgsuqEEo88T4SpGs/eZcRgGBX/96qaxUY01FMTIVX2tio7Yx7DImSehdwNIhTORTcVokM4F/kgq9BYwSaYsAVESDemDh5UB1vuE7IOmSewCJlnQ1Ucjc29g8GxoEPNEZnxIlMIIcoxB3lcPPaQszohcJAxj2ARMs8jHAzi04tQeJW+JIQISYPsasYMVW/Yhx4XL4OgCjf3GfMUFiHzbGocsGwXSqezKwHZ24yRau+p2EeE6DUp9VEexXZhfo1FyDwbVcdNIpcbS9EKPpnr7TfNGGk2oJJyZFSATAoaZCEyv8IiZJ5F1rxR7ab3fcXBx9jPjJDskIAxpAnExBBQlJQjuEpJxvwKi5B5FmR0eSQzA07O5zM5GwamzH04nQNhMqNAtW4hNvSMU3sQ1bVhDtiHwhl3MNadRzFPYREyzyKdDY9kbg/AC09TQ/TnUCvcE2LGRd47xhLb4PlAPApEotNUR+2GaR7GPIpFyDwL1e8HOB0ESD3kwrGQ28UBySHZ04ySqnbjybz0jMNUCNJTU2PW/jzEmAdYhMzzkBPJOn+qXOgBhSCpykVCpKPMqKD0S9xn5PPww9ls3odxrxDD9+R9QjYQ8zgWIfNHIDxTPQq8VclJgHAwdjKjJKIdgcEW9GTesIsMj5JxZFgQIo2YYMwTWITMH5BtAHTBpdqFhmhVyW3b45ldGzdKEBqNqs7jG6imDVJ2wiBinzG/wiJknk1Vu5DrpTqOWd1xzWihFESVW5WCsqMCM0WkJkXWIfML7EHMs8GnIERZJZeN0NlBoZxOHmfGg9p+wgbO5+eyCUygNIe2whpZ25insAiZ5yE/kkKjKrlwPMys28WcOr/IXcQuSsOUhJQhIacig6DTSj09NezEVmKewCJk/gj1csLxcL9Quyek7/lkP3NitHg9iNg+vhvYgm5SjQxJVdnqqG3MEqE437ZhnsAiZJ5JjpCMQ8EJcWPi1bcrha3Xa+1HlA4dlPmaEI8q1NDDLQSGJUKi+NUrJ0bPOL+IUpCOiRM5pvWG4xyPpmF+h0XIPJPyImRpYz0WCNB8NlcuuBwUe83Xh3ikAKNof0xAWjjik931dzG/OzzDJFzGPIFFyDyLvpYFYl0N0uGlzs/napSG7YaREyxDp4FkSPFc876WZBgZkb5XXLOLhFIQy3auMU9gETJ/QDoT5WzjheOZn5+HEKUI1YCm5rQoAap4TxCZHEeQURI0PA9T258CFHDK8DRjDrAImWehjK48SboTOaQIozpuHqUhtRX5zvjTQoUbhEXvLTCXtPdkdSwixE3LrVNCzKU/kOfZLszTWITM78Gr9FnbAeFbaBNQu9AkR08wJ8YT+kF8k/lglAR11Y+woVipes6YZ2ARMs9GTkY53XQwOJyqkqFKTo91NqdHRPcuznObUtDFxUW2B8Wk8BIsDmW9bde5xjyGRcg8j3AoKUKxHsKjrrcBnRPIEV9eXuqGxcoJmxNgGJWlIxGGqDBaxuXFpcRI1XD9wezdiQ6ZFHXVbtvGHGIRMs8jvAhDsKgkFOt0ydUUYkRu+OLyQiKUvmjovYYOCobr5jOjDEXEdYtpTYWq41pVXD7Kg6N37UG5lXE9PM+YQyxC5vc0HVGutvmTLBGx3GpDVXIX51pyUOaOWQ0Ta9spYDa5r0I/AkLEM/F+3/FcoG03m08j03HeTaYYQzOOX1BiZMxj2COY53F/ptyvuuIyHEuUivAt2+2mW2/W4aTuu4sQocury5Y7zlJTOjCcVaJ1bdoxfV528Tbs8UiGg+ij6vUq4jliPwcoHUxFv83pjmrzCyxC5tWU66F9gHYCbl4tIcJJAb3oCMuSEyE7h2U+GykeVLNlzzc6HrTRss8vuovzjN/ECmNeh0XIHIfwRRKhyCWrfWg2V/CuHSkcG77NPutLgOhQCtKYcWxHxFHVenV1pWrXLN06Ms3rsQiZo4A7wjHhqBCi6i1XVTqq1rHP+nIgPmQkKPnQJZtqOLriZwk3ykgSI2NejkXIHAXli8NhMSE+jLB9dXklh0UVHO1GVTVnPj9qz4mXMhCtFKRSbghRKI/iEgGyCJnXYhEyRwOHxSCm08g10zaEEOG0ePyz9tEeZJ/1Zajx4LIt6FxxWfcFMRcu4JrXYBEyx4Fcc0zqFReb3MyI0yL3XB0VhD3WlwIhqnikNJTVqtnGl2LkfIV5HRYhcxxwRuGYdl24c5h/ObCrQfuQVeiLkKUdMhN0RkCEiD+qVVEdRs4mLtXb0ZhXYBEyRwMBois27QWbzSZ81ZnE5+L8opvN85kzEigL0aeHEo7agqY5GsZ5xCPbiteIR42cHdvDajljXoJFyByRzBnf34ejCsva3q+1vPp20X3//q3TUD+2uI/nN/VnyiY0cdEj3CfTKAFtFEbplkwGj3RHjJiNeQ12CeZoZAkn5vBLOeRLhuY4Y7NwYJNwWm5D+CpwjxD3e1UJVmGK1+y23UL0bsxLsQiZ4xFeCQdFtZzUhqDYZpqEENGw7Zzz14BoojNJlXbYpnp1j1QhY16FRcgcjazGydwyTkshWRxSNQ5DvngA0y9CRKDGCmxChAQp2CUfc2TsEczxkN7shnoBlYQinKq483OG/rcT+/SQkYhJAkR8DaOMzcxhGHMULELmqGROudoQYp1FqBBVdNW+YL4AEU30dMxSbWwcRJvj0RwLi5A5HuWwQnm4aVWrMeuhZ7HKPSfp0EKkFGI+K2QmegGKqKq2vYc4Hs3rsAiZo1Gig8PqxxaLKbtt5yCY6rRgvgR9/DEhQuhNzITVfkW4Ma/AHsEckXBP4ZhShO7TWbVtqudq227ri0AJqAkQ621LutMLkd6NeTkWIXM0hg6JdRxWuap0X4w5pgAhh2Y+FftxMlg/VJu27Rg0r8UiZI5GPkk1R12mVxVVcpA3qcb2hiq5qcJ2uevGoZMzb8ehcgz/e0ULB8Qc4WQaIjq1rNJPVs0xD0805mVYhIwxT2KZMW+NRcgYY8yHYREyxhjzYViEjDHGfBgWIWOMMR+GRcgYY8yHYREyxhjzYViEzLvB3Sfu8vtVyLuCDm8pMubYWITMUTk7092OcmHctArcwIqp6THR600To3BxQ0Wyt/s4hv+9oiVHuOAR3lPFITce50G6EZmDYjOjbxiJxvw5FiFzNGpIHt1xjzM7m2hdoyMEbG8223RgcbCcmflUKFaIyIizzWaT64EGoY1JDyVkdx7sGDSvxiJkjkdqzY4Sn+a1NtuNtpPDg81nZKOhlxCfJjctTh1/5lhYhMzxkJ8K5xQvhEclIoKbAyNnXWHm80NcbTbrjM8qEcVUmQrNxrwSi5A5KmSUS2j6THP4LAY3Xa/W7YmrzOnUzOeFalTahXgoYcYXj+XQLsVxRa8xr8EiZN4GMsvNY5GLZn21XjXXZQH6ChB9KzIOkYHIglDEHoGOPnNELELm6MhPyWs1EWItSkDkqnFizkN/foihKgmxVBWcyPYh4rji15jXYBEybwDOqTkqrWZJiDYh+60vhOIsRShzEgoKdhkMY16LRci8CVV9U1D6cceEr0XG2TZFaK8k1FaNOQIWIfMsshKtCQhOaDgHQ3GRz4pZVTjNY1Edl50S+lPMF+B+WyIUKC6zhFtB8Du7GNqGMYdYhMxvkRvRzYrbcC40UvMI7zCeSchMrBOu/eFrzs5m4X/OIgd9381mc82b9bZbLpftalzPfAXy8d2T7u5urRET5sTnNOJTNxyfdZOIa8SmbCPtgpEysAOMIcPrRldjHsMiZH4LosKd8uFe5Ji4f3EdwsIQPKxPJtNuPj/XsDxbVd/oJJ3DxnqzVs84quPYb3/0BYg4ouTKDcaru1XroECcyhp0yDYiv+KeZdrFRrbBOraCzaTttKKRMQdYhMyzkQPCoWhJFhhHE3ncVtWGtignPM1jcFJ08ZUTiyXbeaFcmE8McRRzxuGqu1veZRf7iO+zQRyXWGlGpUqoNLdjjPkFFiHzWxCXFJzmm8KxTHAwDGYZ69zMSGkHJzSZTuMYquM2qoK7vb3tFotF5qRjUhWermI+M8QRg5UiLojQ7eK2u7257ZZ3S5Vma79uQo64xwYkPBEm22A9roPNyHZ0VWMecvavf/+v7cP8FpVz9Mp7RpTDxdHEQqUhnBDVdXHs3d2dZpwXMwKknnGIVDgo8zUgjqtH4ywyF/Pz8+6ceX7ezefzbjafKf6xColOzCk6aQ9lK/nSgcY8wCJkfg9OJMRju920RulwLpHjnYZjYqj/EqG7EJzFYqmqG0RIpaOqphlAdY6d0ucHEaE6jvhTjIXIEOez2UwixHx1dRnCNO9FiAFPJVxUver4KBlNpnEN7KZd2JgBFiHzeyRC08zhVhBOJ5brcDgq9dytVFWDAOGEmIEqm/65QuGI1JjttoJPDzFNBmKYYajMBiheQ2Auzi+6i4uLKCXNVUqixMQRdZzOjLi+v/eNyuZxLELmmdAGlA5JOeQoEVHVtlgu1OYj8alHNZRFhQeix5zaFsIplQilgFmEPjMlOAjN7sF2GX/EY4kLcU3p6PzivLu8vOwuLy5VQlLHhZhKzCILwhnGPMAiZHoG2tFDGNtnISZsIDSUfJaLpQSIEhCOqT+pnaCSzsCycEb5au0He59iPhuVacgOKBlfJUziMPoimMwGJSKE6OLyQiUjMiEcex92w5nD09qVHlzKjAuL0OiRPIQjiCmcDSAq+JpyQKzTxZoOBggQ4sNyo0d10+OtVbnFcXJScZmh08pP2GER+vwo1ijBtLjsqe0WVNWqVUpi33QWJaMQIMRIVXSzWd+JgWuqJBXrsplA7YYx5ZXahc1osAiNHUY8QDju03ngBDRopdqVs+2G+0Our6+zw8EqxQeohumr2iRcWcpJMCs7lFOn4hw7YIkdVHugxGh+rqq679+/a8QFZUoQodCf6XTGFdKewg5lO2GHZlxkVsSMlhINqtnSeVCymaoERMnnx88f3X/+8x/d74MAacQDBKb5CnKwgu09/2FnMgoG8b5nC7GOrWAz2A42hC1hU9gWNsYx6sTS2hJ3GRgzJixCI0eloKAcANubcBR1oykloOufWQrCgVCVEgfv7vdRzrZKUxlkRgTR3sd/GoBsI2wEW8FmsB1sCFvCprAtbEznBEPbM+PD1XEjJ/KrWlL1RpUKOdOfP3+Gs1h061XmUgnDUWhi2ZwGkPsdCtBwnzl9euGIaC8bKdinudlI3lc27Wbzqe4v+uuvvxSWVbnNDp0vHh2O8ZFTPiTr9FOEuOH05uYmR76O/epyG/trVgeGeMnB0HjNNZoTMuNCcU60YwZ0MMCgCFKV285msCGOwaawLWwsMze5H8oWzbiwCI2cXjdwIpEbpR5fQ+8jMATKx+xyuArF2bQeTYAjyhtQtWlGBHGecf8L+yj7iZdCsa2BrbXDbD8jxSI0clSFEjP191SLAFUm+eyYmRwEOVYcRx3TV58054Fz0ay3CjSnD3Edcd7HfxBBEphmJ9gMtoMNsQ+bwrawMc6uY8oOzfiwCJlGOgFVozDeF3e8xzY5V5xELy5t0R/fHEfmbtlpRzIe9m9g3dlDs4HeVtKGsCX2l33lQxEHx5tRYhEygqFZuG+DhmLoc6gxqc6+OZiaCUOw1D4U9O0BZlRIhCLuoexBtjGwlXjLsJiwKWwL1FEBm8O+zGhx7J8gKo+EM6AX0tmEp2OuY16FA9jENjcR4iziuDNuLIwc6pbt7Lk0ncy62exczqGchi5Yc6NywBIefWCbzbioeMcMhjZRsNrmytRgW7KxsDVsDtvDBmWLPD5+YKPYLLaLDWPLadOU0M2pYBE6QeQTwhHwqGW2MtHPtWR7GzlXZnKw3DRIOMffMRI29wOt8hEMeA6chi74GDib5nA4TseaUbEX7wN7eIDMiOPS7rAxbA2bw/awQT3yodkmM2cc2i42zfG2tNPBInSikFCVs7yPhByJW6MgnKUA5TOBIvIjTJ0PIkXrhsLrn7qrnVGx1ZAMv0zt7LQ7MMVv7KHtytsAFrI1bA7bYx+2qJEUwjaxUWw1q36zlI4tp00/IXTmS+KbVU+dlvBJuJV2qaavwUm3mywB6ZEMtzkwadXZD/1Jrg4CjHk2YXttTbQN2ok00OlVPgKCh+NNpmdZGqIjw8Be1bYE9lYnh0XoVIk0i9DsxoSjaoNnw2SJiIfRMVDp4napGwfzMdw8liHMoZ3LUuJFjpRGZwKM+UOQoN6GEJMwsWprpIcc1W3czHp5eRGCdJFVcFNKPrRnYqdkinYjLvTtlOYksAidKBmp+Y54ZJdYqjp4DPddd3tz290uGMdrJZFSFQeHNwHCWch5WITMKzkUISbsqheTMCvCEZmLi3l3dXnVXX270gjcsSMyRpu8sVUHgy3xlLAInTIhJhMS/SQft8BgkgybsmiDSK4YkJRcJk6gknVbrwTv5G6OydCuelGJhdbjRWZpPpvpkeGXV1da8jwiZYp02wDHUTIyp4JF6FRBfEKEVKURJR0af2kMlvisskdSlXYAscI1sM2+FtznXsnJGvNSsCPsqrcjMjvYKCthbBIXBedx7KOKTmJ0ealnElFSki2qBGV7PBUsQicCkagySxVcIoD2nbsQHMSHmUdx17NbaBSm2q2qRIbVbXt17s1Z9NvGvARMaJC5YVvtjoEyPohTC8P++htaJ9N8ZHgIkcRIg+lilNqt63HJ2jRfD4vQO5F/ciaXPsGwMvz3+4RFstyBBmhnC5coQB0U23UpEi/VFnQ8WC64D+OuVb2tdECNdCBiuxchrsF124X0SfEq+u9gzB8T1jSwJcxIFlu2hl1zQGxXhxhAmCRGsc14c5SK6E13cXmujgtUM+dIDM1U60Pq/NjWqox3/zvswoNB+O5iteB9kGbN0bEIvRO9Uw9r7hMgby1laNdZRUVLlKKJQ5BhVFXMtV3XU1VazFS7ITjLRcx3Mce6julpJxjzZTiw2VhFjC7OY76MOdY11FSkjWwvymPg/j4yXrFxmH4gwyp8IDIKz+s8SLPmTbAIfQL2jJ1EoM2sFx8mIOUMo+Ry1mVPNxpxgc4FEh2q3Vqbj3KQjllzikSSoASkbt0I0uWlRGmYHuhRF6lFJatq1wSlo5glKiS1gXBZaD4Gi9B7IfvmLRPBHi0d5KjCE1Wn9e0yJI4mRruEFMvYR/sOgkOnA7pb920+sW94vDGnRAkJaaPajOjWTecFhImwTDckoN3xOoeg2JfiRMedNjIDBx4kl0w/zO088yZYhN4JDDqSQRg9WwdG3YxfwhETAkSph0NIBztBYcmQJoxycKdqNzoccN+PbkiNE/oOBnpxjjGnhVKGXjG1Dg1UyXFfUXVgQJimjL5AIuK4Xoh0uNIJQqRr5EG6Zo+STqY30lF/jDk6FqH3Ioz5gbHL0GMhgWF/e8Pwe+HJ8xAZ7vPRcrXRUDu0+SBAXI/REHQzKp+jktR9NvIac2KQSav737B9qt40qkLYPkKUHRjmGnEbceI+o+reDSlGcSLpTelMwRmmlVzspc8KM0fHIvQO6A8uA4cy7t1Ke4tjOEwJIxMHbTsrjTicHQ0oATECMVUITJylAR6pD48TyBkiVCTUfE5L+wxjTgKG8sm2HgkLPT0jbeWAp7QDYfEMesqjTGbZm452o5jnsU1bkvQn31ry4I1t1ln0KztIj23VHBeL0Dshw+afDkuuHNm+redjFZiztLNWt+r1apXtPjFXSYiGVxJfn7uLC2QbUqyQWJRgXIVgThPsW1mwXkiyao20RRhphMwYHRWqJMT9RbQXzVjOWGbpSEMC0Y6qFNOo5Knr57Yl6O2wCL03GDTCEUgj4k1tQLGk1xtB1d6zXC5UCqob96B6+lSiYF/NQMKazkKcYiIxGnNqYOOI0GZdg/Nmb7maoURKbUaN7FHHkECX6t5NKYlURC860lQKGekrj+9FyLwpFqH3oomPxGNg5FSrqRoh1rm59ObmVoKy3qT47CcEklYmQlZqvxJQ5Pokbu2aFW7MqdHbPFVxsWRbA5z24VkqQqAyBbR0oMNzfz67aNJ9+3alm18znJoIRKgdH3BNZovR22EReoJ0980AB2Cgw1n2eXAMp+r8Wob1Ixx1DkElNHSvXtLOs6baba1quLwE53FmJYgWEm+6BqskkJjYJkFxLGFVsnLHBHOKYN+y+bBvlqSBPkPGNEgfJJ/camExQaUrquUoHfE4iYsoGdHNuwSKQ5TGYs4SV14/X7kcwufy0XVOzUPyu3H2wckjxiL0FLKR3V+TtpRGVUYO3NeDQcUeHS6ja7t7g4vF2Vk+upj7eGjboZ2H+3qoemMdQeJ85e7E7jOegz6/YQM3Y+B1Np/nUmvAqQgPbUZU0dG9W+1H9KqL0hFV4Pf31Fbkeb2wcKoSd34+30eDqzZ2viJ9wI7YaJcw8W9YhJ4AwyoDive0vzTAKmkwk2MiR4YBDuFczTGxj27VPDqhH8tNpZ+shtNxJT6ODWPej0p2gyrs2YwbYKurd4hSiBHdvSstV9ofwj78AiWySvtVUmOGPKOd63TeYxF6AoxNd1KH/WBgejVj2sEDt7JXmsSIKrEQE7XzRPGd0g1Cswnxub1dRJF+q2J99siROedVmsHyGTZOY96RluYqY5lBVG8z531G3P5wdXXZTRGjEChV10U4xyBe+AD5AdIx1XgHibhERyk+lmp30gcbsAg9RRMd2WW8KfczMC7lcGIKmUpzagKFUdK+w82kd3fc17NSV2uq3jhQuSOMsJ2vc9r12awwY8zbozRN0iM9VhpmIk0iMFSvxX5V0c2ormNuN8PG9q4GQ1eK1KuzMz03lNK5tj6DQ/MzTWIReoqhFqR1PQDjYtd2E8ITpR618axaG0+UftRY2ko8KukEMm7Oqn8d23zs4saYd+WxdFnCpM4QTCohTdRepDakebYhZekoU7KucwhBw2T+yCFjxSL0BJIKlbDT8LSMCRFR8bsV3+nRVqJTnQzUkyb+1Tq3quokQCq6x7KJkY5pc/tgY8x7UcmO9NhmpfRIj1W9znpVuVXbEedRVVedGUqU6GmncyPTqfNjXSmda7dzs+Z9qEjjxiL0S1o7TaCieRhh37NtvdK9CYxkwE1zMrQy0Aa6Qu85roH4cMye8bG/tlk4Jox5fwZpjzQ6TIeVZmucOnq/DZK4REZCFRM3ievJr9OJqu6qh12JmdC5ux50Jv5Di9CAZicFj0xAeOhYUCUelXZCgHS3NjeZqrSUOZ7K+TDLfGW0KUzb7VrXf9AmlIfqGGPMx6A0W2lRaTdmMp4k8AibTLKEk7POGKTtrBVBoMhz0q0bQco2pHy8BCUkOjakjzhI6yNP+p9ChPgCitdfMTCQIs85OLMdVxz+OB1dp7SdWmBEgyXCc83oBVHaofSjEQxiHYPj/N4gKS3Fu87KC8ggD6n7f2Ss/bFcR+96iYenGmPeir10R9rVVkuSmcZB9xMdkPt0oI7V+VHKKXHimogOJSPajFQqivXv364kSLqyfMhgCbWSl9ijPwbYePC15F16dNVHj9uH3XvXfkc+XIR6h6z/qv0N9W8Mv5lyDxm56eTjaM5pRpIhWRLRbo4bXmCwStdL4DhyOrThZGmHjgWtUwFhITo6jpN1/u6KA5N5lMHHPXpkXel31zHGvB+/Spe/S9NDdtdp73rllh67Mt0fWBVRoo1JNSXt4jmwatC2C10H0YpFZmrpNJGkf9SafGEvlPd1RNAfXItYYT3CH/vdb80nEKF6H/z8tpJi8xD+1/pz9adH6UTPl9e+/ON3EZBk5GQELZd3qk5DgFTSiVKO7t+hpBNhatthateEX0dOfn9jzFj5tQ/AnxTyTUyT1oEhRAkByh52sR1hVOddXDCm3c6nFTtftvNR9XylPK72adcD+mu1/bngnW/1/nx8ddzwV8c3ib+ubST8kRxSDXv1x+b/mH8a5+i42KD4y3o+tjdLOXXD6Bqh0bA5KT61v+p0uVj2auGqKXDGGHNMSih0U3v4KVweYfgulYaqCm+GL0KcaGPKG2Vrf7ZDU1rKjhKs4w3TY+0ESB8VZMZ6t13Igw7D2nnvyacQofzz+OPiqxx+m/YH8cezL0s8eRAR16t6wB/NA69ytIKYW2cCPZeHKjb2xVzjvanUM/jMul71drEIGWOODT5G/g5hCB/T+xl8YewjI6z94Z8kSDGrC3j1uGPAVcQIcUKQWgYd9q4XF6SExHXxe+LQpbXPlL9j5we4vE9TEtIfV99k95/qD+phf7+ZKyrxRKmGnmqMTrBYLPWHq52HUk7sq0jRtTitXYc/Xq/6DL7CIBL3PtsYY47A0L/0PikoH9iLAeGsDo6vqrsqEV3quUhz9chjn24JEXlOf51GXUvUKl9h4APfm8/TMWEIkaMlr12uQeHtz+LPpGpNw+Pw2GtKPHQqWA3u2YmJ8xV5LUdBrkH39cT5VSfL5+iayplQWsovVNVyxhhzHLIaDjSGHLUyVZKJ4GqTxmfRLsR61eDgs3qfxrkxMbAqpSM6OJxrwNV5XLc9cZlLIjrN1zFxfnspfI84hWPem88jQr/6AyKYfvpERFax5cgEev4ObT0xUxICFT8PriPBGlS9SYxaJD2ggj/0XzHGnDS/8TPyWVShxXHKRCNWD3wWfi0vQEmIKjtV2+kZSVTdnavqDn+n+xSf+ix2sI/P6r/Y+/EJRCjf9ePjT9b/rP8kpviDSzjIMSA6i8Wiu13c6qZRVbXFVJGUEZcjWhOm3iK6flyCfboWx7cwLhyvnggfRraMwBhjjgj+CdInZceEnnA9JQS4K5yVer41n0SQRl/h3FhmaWrXvs25VMtxk+zV5VV3eXkpUaKGR9du12Lipc+IN/nCDH13PkaE+KXxqfrZ+i/yD6k/mh38qVUE5X6d6+sblYIYoZrebiUQ/Z8aM9fTf13XCWqd6+zQkZoO6aOBxcPdxhjzOga+5WkfVHPymB+T6LTWBNZrBoROj52YZUeG79+/ddyfxHXYt9cMwTl6cX4L1kVZeXveVITywrwjEtrIOs74pWzTuKaw/oenmADtNsu7pR4AR6mHDgecK+IQRVQtg4xMtgbbepE7gHxPODaPP6TOg6GYGWPMMSihwP2Uv9qnfNNw387D5Sv3ZWiWgPptvXIJtAdlB4Z8UN/F+YXamyAFqF27fRwdugjA/1V7VX5lHdU+6Xi8nQi1b0qJha+tImiEVU82wlBo7uSVKDHFj+ZP4U9YLBfd7c1td3t7qy7W3Mj1uCjU12ffYz+lzhnue+w6xhjzmTj0Z7/ycUM/uA8+lRvy6eJ9dXXVXX276i4vLlUIKJ/LlN25eQr0WtvV445Lq1aKY1pVImHH4k1FiB9YVWqsZ68NfhD1mfVo60n82Go820aJ57b7+fO6u7m90f0+eZPWTB0R4oS8sDHGmGcQPjOcLh0V1IErZu4v+nb1rfvrr+9RQrrqfe9mG+Jzz32U6atpb8Ll7nx1FiZY/xoiBKUX+s6ttNMa0vgh/PDJ2VS/hwfC0ekA8aEKjtIQx9VQFlTP5S+3CBljzPNIn0n1G7VQlIjwvZSCqJpDjNR54Xwuz7q930hoykfrtpXmu3vXe2TFeDMR4osjMpRi+EHDari62YofRScD2nturm+6m5sbqTV/QhUVOYdzq5+7McaY5yMZoddwZOapYkNcdCN/88/fvn3rvn1HjC7UmQGRYT8z51a1HOeVfz6mL24VfG8A0jaUt/ad9YfERO83fiTi8+OfH6qGY1vHDY4V1h5jjHk5j/nUmPG5+F58ML6YbXX3blN/bHHo14/AG5aE8l3377R1QEH5cVS/0fuN9p+75aov6einh+Lq8Pjx1ZWw7xlnjDHmj1Avt3Ch/X1JsUlNU+9zw7+eX8zVTkTvuayey30JW+38tn4s3qwkFL+vb8Ti5ip+SwkKnQyur6+7v//+u1vS9bp+KL8sVjlHasy5MR33JxtjzLjoxWbgW/G15VrZhy/GJ+Ob1REMH47P5tDw4ZyT7UV5zrF4u+q4oEREPzRm2nfodMCPpAMC9/9AiRVtP6m0GaYug3E6dZfGGGNehnxo+FJ8Kr5VYeFr8bklLoBPxjfjo9VBLHx2+e8SsWPzZiLEl1UbDz9cXbPPNOwOP+7nz5+qjlOnBboBRlEQpWZdSpu/OK7RLsafYIwx5mU0HyqfGjM+Vr62mkHwwbGu22HCN+Ojs0S0lu/Gh3MePv3YQvQyERoqI9+sD4u3mPXDohgXX72bTmfaubhddj9+/Oxurm9DlVOYVOi55xwuwHqbda02w3F/szHGjIvyoUPfWv4WtI0YpW/GR+Or8dn4bg7Al+PT+5G/m7/XuZzeJm23sOfwypJQ+zS9WM9fVUrJTVGsUb9IN+y8/ydHUOCH1DfNc3dof5uMMcYch6d862471lSAOJOvpp0I340Px5fj0yF9fM46V6fztn/d5/AiEeILMO+EcPfBtQ9o1FrHl2foHW5E1XN89MUhli/7zsYYY45N74/TR+Orswv3Qj4cX66OCuwb+HlAA0oPDvf9jheLUGkJH87q8OsAx9CohYoyBhzdsetmVX1RHZmTMcaYj6X8sXwzghKTOpOF78aH48vZ3glM8/Vt7n15bLy5CIn+85rq6UPP1PuChizGIKpn/1ANp1EP2DfJH9m+dX8dY4wxH0j5Y9w5q2rbz9Fu8OH4cnx6P75czDohfD8awCT+0Ke/SIQkJu2T9OHxpVjWdwJGYqV3harhokjHORr+geIcP5Lj+2/bvrwxxpgPIH0wPjkLFdmcgs/Gd1e1HD4d394Ols8fakAGxyQxeB4vLAnx6W0V8jvn6vZe3foWoZyL24XGGgLd90OPCpFH98ppjDHmwzn0yfjsuocIX45Px7fj42sUG70PT5Obf3MROhCPUL0smsUXDcVcLuOL3uZYcFJFdeeLs+K0VE0dmmj9+V/YGGPMsdn3wemnm6/GfVM1F5NKROHb8fGsg3z/g5LPgUb8gheJEF+sil58Q32HVsrZbEIto9iGWqreUCWgrILjuRR7ox88/3saY4x5S/DHA5+Mr8ZnE1Z+HJ+uWq7w8TwWArLtSGvaflDQ+A0vEqHWtaB9YdqC+BLZr/zubqW5f/xCU1CKeTxBlQnySxtjjPlMlG8e+mx58ebP8e3l53XfZ/P/EoQmDb1GPIOXiVB8EZVu4nNRvfwCZ7qx6fonzwTadLPZPL/TNn4Cx8REQxdzHW+MMeazkaLS++uYVLqhDShe+HZ8PL4en1/Hq3Ys3LpKTKERz+VFIsQ32fWIyw9fr1fdar3OAUj5rnwhY4wxJ4V8e7zw9fh8fP9QC9AGHfBMXihC1BfyYSF87YPpR34Xc7X5WISMMeb0KN+Or8fn4/t3IpTa8Ce8SIT4oFI7PpgvQ7GMYcDryxhjjDlNqvCBz8f3owHp96uWLI97Di8uCakekArAgK56d6s79SOnFGYNMsaY06XpjXw+vr+6a6cm/JkAvEiE+ALcxFSlIL4IMz0p2hFtaYwx5vRIH4/P7/1/Kw2lNmj3s3hxSUiPYogPkhIu7/ILtH3gKjljjDk9hr6dNXw/GoAWEJCP6Xk+LxIhyjvqoh3wnAmKYxSC+HLUE6rhyhpkjDGnR/j28vPp8ztpAFoApQ3P5UUiNGz34RlB+eHxhdqHq9MCSmWMMea0CN+uW3GC9PmMF7qSFihMIqXVZ/EyEQr4EBqjdG8Q3bXRnVYneHY2/aMvYYwx5muAb5+Ej6faDZ+P70cD0AI04U99/wtFqPqDb7stvSLu23a86dGwf1gnaIwx5uuQfv5MPl+iExqAFqAJ2v6D9phXqEXWCdYEbgYyxpjxUD6/V4JUpAx8Jq+ojrvPklAbTyh7TGTHBMhtY4wxp0T59vT1easOGoAWZEkoNeC5vEiEuCFpJ0LVQBVfRN+l1NAYY8wpgo9nwufXYKWlB+xDI55H1/1/TrLCFveu1EkAAAAASUVORK5CYII=';


  tpaList: Array<SimpleRecord> = [
    { id: 1, name: 'Health Life Insurance' },
    { id: 2, name: 'Star Health Insurance' },
    { id: 3, name: 'IDBI Federal' },
    { id: 4, name: 'CGHS' }
  ];

  slots: Array<SimpleRecord> = [
    { id: 1, name: '10:00 AM' },
    { id: 2, name: '11:00 AM' },
    { id: 3, name: '12:00 PM' },
    { id: 4, name: '02:00 PM' },
    { id: 5, name: '03:00 PM' },
    { id: 6, name: '04:00 PM' },
  ];

  dataFiles: Array<any> = [
    { jsonFileName: 'appointments.json', localStorageKey: APP_CONSTANT.localStorage.key.appointments },
    { jsonFileName: 'bad-stock-medicines.json', localStorageKey: APP_CONSTANT.localStorage.key.badStockMedicines },
    { jsonFileName: 'bed-histories.json', localStorageKey: APP_CONSTANT.localStorage.key.ipdBedHistories },
    { jsonFileName: 'call-logs.json', localStorageKey: APP_CONSTANT.localStorage.key.callLogs },
    { jsonFileName: 'complains.json', localStorageKey: APP_CONSTANT.localStorage.key.complains },
    { jsonFileName: 'consultant-registrations.json', localStorageKey: APP_CONSTANT.localStorage.key.consultantRegistrations },
    { jsonFileName: 'ipd-patients.json', localStorageKey: APP_CONSTANT.localStorage.key.ipdPatients },
    { jsonFileName: 'ipd-prescriptions.json', localStorageKey: APP_CONSTANT.localStorage.key.ipdPrescriptions },
    { jsonFileName: 'master-appointment-priorities.json', localStorageKey: APP_CONSTANT.localStorage.key.master_appointmentPriorities },
    { jsonFileName: 'master-appointment-sources.json', localStorageKey: APP_CONSTANT.localStorage.key.master_appointmentSources },
    { jsonFileName: 'master-appointment-statuses.json', localStorageKey: APP_CONSTANT.localStorage.key.master_appointmentStatuses },
    { jsonFileName: 'master-bed-groups.json', localStorageKey: APP_CONSTANT.localStorage.key.master_bedGroups },
    { jsonFileName: 'master-bed-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_bedTypes },
    { jsonFileName: 'master-beds.json', localStorageKey: APP_CONSTANT.localStorage.key.master_beds },
    { jsonFileName: 'master-blood-groups.json', localStorageKey: APP_CONSTANT.localStorage.key.master_bloodGroups },
    { jsonFileName: 'master-charge-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_chargeTypes },
    { jsonFileName: 'master-complain-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_complainTypes },
    { jsonFileName: 'master-contract-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_contractTypes },
    { jsonFileName: 'master-departments.json', localStorageKey: APP_CONSTANT.localStorage.key.master_departments },
    { jsonFileName: 'master-designations.json', localStorageKey: APP_CONSTANT.localStorage.key.master_designations },
    { jsonFileName: 'master-doctor-shifts.json', localStorageKey: APP_CONSTANT.localStorage.key.master_doctorShifts },
    { jsonFileName: 'master-findings-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_findingsCategories },
    { jsonFileName: 'master-findings.json', localStorageKey: APP_CONSTANT.localStorage.key.master_findings },
    { jsonFileName: 'master-charge-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_chargeCategories },
    { jsonFileName: 'master-floors.json', localStorageKey: APP_CONSTANT.localStorage.key.master_floors },
    { jsonFileName: 'master-genders.json', localStorageKey: APP_CONSTANT.localStorage.key.master_genders },
    { jsonFileName: 'master-general-settings.json', localStorageKey: APP_CONSTANT.localStorage.key.master_generalSettings },
    { jsonFileName: 'master-hospital-charges.json', localStorageKey: APP_CONSTANT.localStorage.key.master_hospitalCharges },
    { jsonFileName: 'master-leave-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_leaveTypes },
    { jsonFileName: 'master-marital-statuses.json', localStorageKey: APP_CONSTANT.localStorage.key.master_maritalStatuses },
    { jsonFileName: 'master-medicine-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineCategories },
    { jsonFileName: 'master-medicine-companies.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineCompanies },
    { jsonFileName: 'master-medicine-dosage-durations.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineDosageDurations },
    { jsonFileName: 'master-medicine-dosages.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineDosages },
    { jsonFileName: 'master-medicine-dose-intervals.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineDoseIntervals },
    { jsonFileName: 'master-medicine-groups.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineGroups },
    { jsonFileName: 'master-medicine-suppliers.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineSuppliers },
    { jsonFileName: 'master-medicine-units.json', localStorageKey: APP_CONSTANT.localStorage.key.master_medicineUnits },
    { jsonFileName: 'master-pathology-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_pathologyCategories },
    { jsonFileName: 'master-pathology-parameters.json', localStorageKey: APP_CONSTANT.localStorage.key.master_pathologyParameters },
    { jsonFileName: 'master-pathology-units.json', localStorageKey: APP_CONSTANT.localStorage.key.master_pathologyUnits },
    { jsonFileName: 'master-payment-modes.json', localStorageKey: APP_CONSTANT.localStorage.key.master_paymentModes },
    { jsonFileName: 'master-prefix-settings.json', localStorageKey: APP_CONSTANT.localStorage.key.master_prefixSettings },
    { jsonFileName: 'master-purposes.json', localStorageKey: APP_CONSTANT.localStorage.key.master_purposes },
    { jsonFileName: 'master-radiology-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_radiologyCategories },
    { jsonFileName: 'master-radiology-parameters.json', localStorageKey: APP_CONSTANT.localStorage.key.master_radiologyParameters },
    { jsonFileName: 'master-radiology-units.json', localStorageKey: APP_CONSTANT.localStorage.key.master_radiologyUnits },
    { jsonFileName: 'master-operation-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_operationCategories },
    { jsonFileName: 'master-operations.json', localStorageKey: APP_CONSTANT.localStorage.key.master_operations },
    { jsonFileName: 'master-shifts.json', localStorageKey: APP_CONSTANT.localStorage.key.master_shifts },
    { jsonFileName: 'master-sources.json', localStorageKey: APP_CONSTANT.localStorage.key.master_sources },
    { jsonFileName: 'master-specialists.json', localStorageKey: APP_CONSTANT.localStorage.key.master_specialists },
    { jsonFileName: 'master-symptoms-heads.json', localStorageKey: APP_CONSTANT.localStorage.key.master_symptomsHeads },
    { jsonFileName: 'master-symptoms-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_symptomsTypes },
    { jsonFileName: 'master-tax-categories.json', localStorageKey: APP_CONSTANT.localStorage.key.master_taxCategories },
    { jsonFileName: 'master-unit-types.json', localStorageKey: APP_CONSTANT.localStorage.key.master_unitTypes },
    { jsonFileName: 'master-vitals.json', localStorageKey: APP_CONSTANT.localStorage.key.master_vitals },
    { jsonFileName: 'medications.json', localStorageKey: APP_CONSTANT.localStorage.key.medications },
    { jsonFileName: 'nurse-notes.json', localStorageKey: APP_CONSTANT.localStorage.key.nurseNotes },
    { jsonFileName: 'opd-patients.json', localStorageKey: APP_CONSTANT.localStorage.key.opdPatients },
    { jsonFileName: 'operations.json', localStorageKey: APP_CONSTANT.localStorage.key.operations },
    { jsonFileName: 'pathologies.json', localStorageKey: APP_CONSTANT.localStorage.key.pathologies },
    { jsonFileName: 'pathology-tests.json', localStorageKey: APP_CONSTANT.localStorage.key.pathologyTests },
    { jsonFileName: 'patient-charges.json', localStorageKey: APP_CONSTANT.localStorage.key.charges },
    { jsonFileName: 'patients.json', localStorageKey: APP_CONSTANT.localStorage.key.patients },
    { jsonFileName: 'patient-visits.json', localStorageKey: APP_CONSTANT.localStorage.key.patientVisits },
    { jsonFileName: 'payments.json', localStorageKey: APP_CONSTANT.localStorage.key.payments },
    { jsonFileName: 'pharmacies.json', localStorageKey: APP_CONSTANT.localStorage.key.pharmacies },
    { jsonFileName: 'pharmacy-medicines.json', localStorageKey: APP_CONSTANT.localStorage.key.pharmacyMedicines },
    { jsonFileName: 'postals.json', localStorageKey: APP_CONSTANT.localStorage.key.postals },
    { jsonFileName: 'purchase-medicines.json', localStorageKey: APP_CONSTANT.localStorage.key.purchaseMedicines },
    { jsonFileName: 'radiologies.json', localStorageKey: APP_CONSTANT.localStorage.key.radiologies },
    { jsonFileName: 'radiology-tests.json', localStorageKey: APP_CONSTANT.localStorage.key.radiologyTests },
    { jsonFileName: 'staffs.json', localStorageKey: APP_CONSTANT.localStorage.key.staffs },
    { jsonFileName: 'timelines.json', localStorageKey: APP_CONSTANT.localStorage.key.timelines },
    { jsonFileName: 'visitors.json', localStorageKey: APP_CONSTANT.localStorage.key.visitors },
    { jsonFileName: 'vitals.json', localStorageKey: APP_CONSTANT.localStorage.key.vitals },
  ];

  public getJsonData() {
    this.dataFiles.forEach(data => {
      this.setDataToLocalStorage(data.jsonFileName, data.localStorageKey);
    });
  }

  private setDataToLocalStorage(jsonFileName: string, localStorageKey: string) {
    var localStoredAppointments = localStorage.getItem(localStorageKey);
    if (!localStoredAppointments) {
      this.http.get<apiResultFormat>(`assets/json/${jsonFileName}`).subscribe((res: apiResultFormat) => {
        localStorage.setItem(localStorageKey, JSON.stringify(res.data));
      });
    }
  }
}
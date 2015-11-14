package example.reporting.reportconverter.app;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;

@Path("/test-runs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ImportFeatureReportResource {

    private final ReportConverterAppService reportConverterService;

    public ImportFeatureReportResource(ReportConverterAppService reportConverterService) {
        this.reportConverterService = reportConverterService;
    }

    @POST
    @Path("{testRunId}/import")
    public void importReport(@PathParam("testRunId") String testRunId, InputStream inputStream) {
        reportConverterService.convertAndSaveFeatures(testRunId, inputStream);
    }

}
